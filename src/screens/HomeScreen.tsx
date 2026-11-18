
type HomeScreenProps = {
    name: string;
    setName: (value: string) => void;
    startGame: () => void;
};

export default function HomeScreen({
                                       name,
                                       setName,
                                       startGame,
                                   }: HomeScreenProps) {
    return (
        <main className="start-screen">
            <video
                className="homescreen-video"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
            >
                <source src="/videos/homescreen.mp4" type="video/mp4" />
            </video>

            <div className="homescreen-overlay" />

            <div className="eyebrow">THE GATE IS OPENING</div>

            <h1 className="main-title">
                <span>STRANGER</span>
                <strong>THINGS</strong>
                <small>SURVIVE VECNA</small>
            </h1>

            <div className="intro-line">
                <span />
                THE UPSIDE DOWN IS CALLING
                <span />
            </div>

            <p className="intro-copy">
                Ten questions stand between you and survival. Think fast. Choose wisely.
                Every mistake brings Vecna one step closer.
            </p>

            <div className="name-panel">
                <label htmlFor="player-name">IDENTIFY YOURSELF, SURVIVOR</label>

                <input
                    id="player-name"
                    autoComplete="off"
                    value={name}
                    maxLength={18}
                    onChange={(event) => setName(event.target.value)}
                    onKeyDown={(event) => {
                        if (event.key === "Enter") startGame();
                    }}
                    placeholder="Enter your name..."
                />

                <button
                    className="primary-button"
                    disabled={!name.trim()}
                    onClick={startGame}
                >
                    ENTER THE UPSIDE DOWN <span>→</span>
                </button>
            </div>

            <div className="game-rules">
                <span>10 QUESTIONS</span>
                <i />
                <span>10 SECONDS EACH</span>
                <i />
                <span>ONE CHANCE</span>
            </div>
        </main>
    );
}
