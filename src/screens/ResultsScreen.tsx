
import Particles from "../components/Particles.js";

type ResultsScreenProps = {
    name: string;
    score: number;
    wrongCount: number;
    totalQuestions: number;
    resultLabel: string;
    onPlayAgain: () => void;
    onLeaderboard: () => void;
};

export default function ResultsScreen({
                                          name,
                                          score,
                                          wrongCount,
                                          totalQuestions,
                                          resultLabel,
                                          onPlayAgain,
                                          onLeaderboard,
                                      }: ResultsScreenProps) {
    return (
        <main className="ending-screen survival-screen escape-transition">
            <Particles intensity={0} />

            <div className="survival-icon">✦</div>
            <div className="survivor-badge">SURVIVOR</div>
            <div className="eyebrow">{resultLabel}</div>

            <h1 className="survival-title">SURVIVED</h1>

            <p className="survival-copy">
                You survived the Upside Down, {name}. Your music kept you connected
                to the real world.
            </p>

            <div className="result-panel">
                <small>FINAL SURVIVAL SCORE</small>

                <strong>
                    {score}
                    <span> / {totalQuestions}</span>
                </strong>

                <div className="result-details">
                    <span>CORRECT: {score}</span>
                    <span>WRONG: {wrongCount}</span>
                    <span>
            ACCURACY: {totalQuestions > 0
                        ? Math.round((score / totalQuestions) * 100)
                        : 0}%
          </span>
                </div>
            </div>

            <div className="ending-actions">
                <button className="primary-button" onClick={onPlayAgain}>
                    PLAY AGAIN →
                </button>

                <button className="secondary-button" onClick={onLeaderboard}>
                    LEADERBOARD
                </button>
            </div>
        </main>
    );
}
