
import { useEffect } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { Screen } from "../types/game.types.js";

type UseTimerProps = {
    screen: Screen;
    answered: boolean;
    index: number;
    timeLeft: number;
    setTimeLeft: Dispatch<SetStateAction<number>>;
    resolveAnswer: (choice: number | null) => void;
};

export function useTimer({
                             screen,
                             answered,
                             index,
                             timeLeft,
                             setTimeLeft,
                             resolveAnswer,
                         }: UseTimerProps) {
    useEffect(() => {
        if (screen !== "quiz" || answered) return;

        const timer = window.setInterval(() => {
            setTimeLeft((previous) => {
                if (previous <= 1) {
                    window.clearInterval(timer);
                    resolveAnswer(null);
                    return 0;
                }

                return previous - 1;
            });
        }, 1000);

        return () => window.clearInterval(timer);
    }, [screen, index, answered, resolveAnswer, setTimeLeft]);
}
