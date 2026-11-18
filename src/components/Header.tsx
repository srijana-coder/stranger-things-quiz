import Timer from "./Timer.js";
import SoundControls from "./SoundControls.js";

type HeaderProps = {
    isQuiz: boolean;
    timeLeft: number;
    score: number;
    muted: boolean;
    volume: number;
    onReturnHome: () => void;
    onToggleSound: () => void;
    onVolumeChange: (value: number) => void;
};

export default function Header({
                                   isQuiz,
                                   timeLeft,
                                   score,
                                   muted,
                                   volume,
                                   onReturnHome,
                                   onToggleSound,
                                   onVolumeChange,
                               }: HeaderProps) {
    return (
        <header className="header">
            <button
                type="button"
                className="brand"
                onClick={onReturnHome}
            >
                <span>HAWKINS</span>
                <small>INDIANA · 1986</small>
            </button>

            <div className="header-right">
                {isQuiz && (
                    <>
                        <Timer timeLeft={timeLeft} />

                        <div className="stat">
                            <small>SCORE</small>
                            <strong>{String(score).padStart(2, "0")}</strong>
                        </div>
                    </>
                )}

                <SoundControls
                    muted={muted}
                    volume={volume}
                    onToggleSound={onToggleSound}
                    onVolumeChange={onVolumeChange}
                />
            </div>
        </header>
    );
}
