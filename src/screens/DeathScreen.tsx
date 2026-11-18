
import { TOTAL_QUESTIONS } from "../constants/gameConfig.js";

type DeathScreenProps = {
    name: string;
    score: number;
    wrongCount: number;
    onTryAgain: () => void;
    onViewLeaderboard: () => void;
};

export default function DeathScreen({
                                        name,
                                        score,
                                        onTryAgain,
                                        onViewLeaderboard,
                                    }: DeathScreenProps) {
    return (
        <main className="ending-screen death-screen">
            <video
                className="quizloss-video"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
            >
                <source src="/videos/quizloss.mp4" type="video/mp4" />
            </video>

            <div className="death-distortion" />

            <div className="eyebrow">VECNA HAS FOUND YOU</div>

            <h1 className="death-title">YOU DIED</h1>

            <p>
                {name.toUpperCase()}, your mind belongs to the Upside Down now.
                Vecna has claimed another victim.
            </p>

            <div className="ending-score">
                {String(score).padStart(2, "0")} / {TOTAL_QUESTIONS} CORRECT
            </div>

            <button className="primary-button" onClick={onTryAgain}>
                TRY AGAIN →
            </button>

            <button className="text-button" onClick={onViewLeaderboard}>
                VIEW SURVIVORS
            </button>
        </main>
    );
}
