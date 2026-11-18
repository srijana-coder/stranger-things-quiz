
import GrandfatherClock from "../components/GrandfatherClock.js";


type IntroScreenProps = {
    introStarted: boolean;
    introVideoFailed: boolean;
    onBeginIntro: () => void;
    onVideoError: () => void;
    skipIntro: () => void;

};

export default function IntroScreen({
                                        introStarted,
                                        introVideoFailed,
                                        onBeginIntro,
                                        onVideoError,
                                        skipIntro,
                                    }: IntroScreenProps) {
    return (
        <main className={`cinematic ${introStarted ? "cinematic-playing" : ""}`}>
            {!introStarted ? (
                <div className="cinematic-gate">
                    <span>HAWKINS NATIONAL LABORATORY</span>
                    <h1>THE GATE IS OPEN</h1>
                    <p>
                        Headphones recommended. The transmission contains flashing lights.
                    </p>
                    <button className="primary-button" onClick={onBeginIntro}>
                        BEGIN CINEMATIC →
                    </button>

                    <p className="intro-tagline">
                        10 QUESTIONS. 5 LIVES. ONE CHANCE.
                    </p>
                </div>
            ) : (
                <>
                    {!introVideoFailed ? (
                        <video
                            className="vecna-intro-video"
                            autoPlay
                            muted
                            playsInline
                            preload="auto"
                            onEnded={skipIntro}
                            onError={onVideoError}
                        >
                            <source src="/videos/vecna-cave.mp4" type="video/mp4" />
                        </video>
                    ) : (
                        <div className="video-fallback">
                            <h1>THE UPSIDE DOWN</h1>
                            <p>THE GATE IS OPEN. VECNA IS WAITING.</p>
                            <p>Video unavailable. Check the video file location.</p>
                        </div>
                    )}

                    <div className="intro-video-overlay" />
                    <div className="intro-fog" />

                    <GrandfatherClock
                        className="intro-clock"
                        label="Grandfather clock ticking"
                    />

                    <div className="cinematic-title">
                        <span>STRANGER THINGS</span>
                        <strong>SURVIVE VECNA</strong>
                    </div>
                </>
            )}



            <button className="skip-intro" onClick={skipIntro}>
                SKIP INTRO
            </button>
        </main>
    );
}
