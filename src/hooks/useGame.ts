
import { useCallback, useRef, useState } from "react";

import { questions } from "../constants/questions.js";
import { QUESTION_TIME, MAX_LIVES } from "../constants/gameConfig.js";
import { audio } from "../services/audioService.js";

import type { Screen, Question } from "../types/game.types.js";

import type { Dispatch, SetStateAction } from "react";

const QUESTIONS_PER_ROUND = 10;

function getRandomQuestions(): Question[] {
    const shuffled = [...questions];

    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [shuffled[i], shuffled[j]] = [shuffled[j]!, shuffled[i]!];
    }

    return shuffled.slice(0, QUESTIONS_PER_ROUND);
}


type UseGameProps = {
    name: string;
    screen: Screen;
    setScreen: Dispatch<SetStateAction<Screen>>;
    addToBoard: (playerScore: number) => void;
};

export function useGame({
                            name,
                            screen,
                            setScreen,
                            addToBoard,
                        }: UseGameProps) {
    const [index, setIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [wrongCount, setWrongCount] = useState(0);
    const [selected, setSelected] = useState<number | null>(null);
    const [timedOut, setTimedOut] = useState(false);
    const [timeLeft, setTimeLeft] = useState<number>(QUESTION_TIME);

    const advanceRef = useRef<number | null>(null);
    const answeredRef = useRef(false);
    const wrongCountRef = useRef(0);

    const [gameQuestions, setGameQuestions] = useState<Question[]>(
        () => getRandomQuestions()
    );

    const current = gameQuestions[index]!;
    const answered = selected !== null || timedOut;


    const clearPendingAdvance = useCallback(() => {
        if (advanceRef.current !== null) {
            window.clearTimeout(advanceRef.current);
            advanceRef.current = null;
        }
    }, []);

    const finishGame = useCallback(
        (finalScore: number) => {
            audio.playVictory();
            addToBoard(finalScore);
            setScreen("results");
        },
        [addToBoard, setScreen],
    );

    const advance = useCallback(
        (nextScore: number) => {
            clearPendingAdvance();

            advanceRef.current = window.setTimeout(() => {
                advanceRef.current = null;

                if (index + 1 >= gameQuestions.length) {
                    finishGame(nextScore);
                    return;
                }

                setIndex((previous) => previous + 1);
                setSelected(null);
                setTimedOut(false);
                setTimeLeft(QUESTION_TIME);
                answeredRef.current = false;
            }, 1900);
        },
        [clearPendingAdvance, finishGame, index, gameQuestions.length],
    );

    const resolveAnswer = useCallback(
        (choice: number | null) => {
            if (answeredRef.current || screen !== "quiz") return;

            answeredRef.current = true;

            if (choice !== null) {
                setSelected(choice);
            } else {
                setTimedOut(true);
            }

            const isCorrect = choice !== null && choice === current.answer;

            if (isCorrect) {
                const newScore = score + 1;
                setScore(newScore);
                advance(newScore);
                return;
            }

            // Wrong answer or timeout: lose one life.
            const newWrongCount = wrongCountRef.current + 1;

            wrongCountRef.current = newWrongCount;
            setWrongCount(newWrongCount);

            audio.attack();

            // Fifth mistake: Vecna claims the player.
            if (newWrongCount >= MAX_LIVES) {
                clearPendingAdvance();

                advanceRef.current = window.setTimeout(() => {
                    advanceRef.current = null;
                    audio.startDeath();
                    addToBoard(score);
                    setScreen("claimed");
                }, 1900);

                return;
            }

            advance(score);
        },
        [
            advance,
            clearPendingAdvance,
            current.answer,
            score,
            screen,
            setScreen,
            addToBoard,
        ],
    );

    const startGame = useCallback(() => {
        if (!name.trim()) return;

        clearPendingAdvance();

        setScore(0);
        setWrongCount(0);
        wrongCountRef.current = 0;
        setGameQuestions(getRandomQuestions());
        setIndex(0);
        setSelected(null);
        setTimedOut(false);
        setTimeLeft(QUESTION_TIME);
        answeredRef.current = false;

        setScreen("quiz");
        audio.playGameplay();
    }, [clearPendingAdvance, name, setScreen]);

    const resetAnswerLock = useCallback(() => {
        answeredRef.current = false;
    }, []);

    return {
        index,
        score,
        wrongCount,
        selected,
        timedOut,
        timeLeft,
        setTimeLeft,
        current,
        answered,
        resolveAnswer,
        startGame,
        clearPendingAdvance,
        resetAnswerLock,
    };
}
