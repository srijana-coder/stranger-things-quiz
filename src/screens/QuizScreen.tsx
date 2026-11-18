

import GrandfatherClock from "../components/GrandfatherClock.js";
import LifeBar from "../components/LifeBar.js";
import type { Question } from "../types/game.types.js";

import { MAX_LIVES } from "../constants/gameConfig.js";

type QuizScreenProps = {
    answered: boolean;
    selected: number | null;
    current: Question;
    index: number;
    totalQuestions: number;
    percent: number;
    timeLeft: number;
    timedOut: boolean;
    wrongCount: number;
    resolveAnswer: (choice: number | null) => void;
};

export default function QuizScreen({
                                       answered,
                                       selected,
                                       current,
                                       index,
                                       totalQuestions,
                                       percent,
                                       timeLeft,
                                       timedOut,
                                       wrongCount,
                                       resolveAnswer,
                                   }: QuizScreenProps) {
    return (
        <main
            className={`quiz-screen ${
                answered && selected !== current.answer ? "shake" : ""
            }`}
        >


            <GrandfatherClock
                className={`quiz-clock ${
                    timeLeft <= 3 ? "clock-critical" : ""
                } ${timedOut ? "clock-expired" : ""}`}
                label={`Grandfather clock, ${timeLeft} seconds remaining`}
            />

            <LifeBar lives={Math.max(0, MAX_LIVES - wrongCount)} />

            <section className="quiz-card">
                <div className="quiz-meta">
                    <span>HAWKINS TRIVIA</span>
                    <span>
            QUESTION {index + 1} / {totalQuestions}
          </span>
                </div>

                <div className="progress-track">
                    <div
                        className="progress-fill"
                        style={{ width: `${percent}%` }}
                    />
                </div>

                <div className="safety-status">
          <span className={wrongCount ? "danger-text" : "safe-text"}>
            {wrongCount
                ? "☠ VECNA IS APPROACHING"
                : "♪ YOUR MIND IS PROTECTED"}
          </span>
                    <span>{wrongCount} MISTAKES</span>
                </div>

                <h2 className="question-title">{current.question}</h2>

                <div className="options-grid">
                    {current.options.map((option, i) => {
                        let className = "option";

                        if (answered) {
                            if (i === current.answer) className += " correct";
                            else if (i === selected) className += " wrong";
                            else className += " dimmed";
                        }

                        return (
                            <button
                                key={option}
                                className={className}
                                disabled={answered}
                                onClick={() => resolveAnswer(i)}
                            >
                <span className="option-letter">
                  {String.fromCharCode(65 + i)}
                </span>
                                {option}
                                <span className="option-arrow">↗</span>
                            </button>
                        );
                    })}
                </div>

                {answered && (
                    <div
                        className={`feedback ${
                            selected === current.answer ? "success" : "failure"
                        }`}
                    >
                        <strong>
                            {timedOut
                                ? "TIME HAS RUN OUT!"
                                : selected === current.answer
                                    ? "YOU ESCAPED THIS TIME!"
                                    : "VECNA HAS FOUND YOU!"}
                        </strong>

                        <p>
                            {selected === current.answer
                                ? current.detail
                                : `The correct answer was: ${current.options[current.answer]}.`}
                        </p>

                        <small>PREPARE FOR THE NEXT QUESTION...</small>
                    </div>
                )}
            </section>

            <div className="quiz-footer">
                <span>RUN. THINK. SURVIVE.</span>
                <span>HAWKINS LABORATORY · CLASSIFIED</span>
            </div>
        </main>
    );
}
