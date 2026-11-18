
import { useRef } from "react";
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
    const videoRef = useRef<HTMLVideoElement>(null);

    function beginIntro() {
        const video = videoRef.current;

        if (video) {
            video.currentTime = 0;

            // Start playback directly from the user's click.
            const playPromise = video.play();

            onBeginIntro();

            void playPromise.catch((error) => {
                console.error("Intro video playback failed:", error);
                onVideoError();
            });
        } else {
            onBeginIntro();
        }
    }

    return (
        <main className={`cinematic ${introStarted ? "cinematic-playing" : ""}`}>

            {/* Keep the video mounted before the user begins. */}
            <video
                ref={videoRef}
                className={`vecna-intro-video ${introStarted ? "intro-video-active" : ""}`}
                muted
                playsInline
                webkit-playsinline="true"
                preload="auto"
                onEnded={skipIntro}
                onError={onVideoError}
            >
                <source
                    src="/videos/vecna-cave.mp4"
                    type="video/mp4"
                />
            </video>

            {!introStarted ? (
                <div className="cinematic-gate">
                    <span>HAWKINS NATIONAL LABORATORY</span>

                    <h1>THE GATE IS OPEN</h1>

                    <p>
                        Headphones recommended. The transmission contains flashing lights.
                    </p>

                    <button
                        className="primary-button"
                        onClick={beginIntro}
                    >
                        BEGIN CINEMATIC →
                    </button>

                    <p className="intro-tagline">
                        10 QUESTIONS. 5 LIVES. ONE CHANCE.
                    </p>
                </div>
            ) : (
                <>
                    {introVideoFailed && (
                        <div className="video-fallback">
                            <h1>THE UPSIDE DOWN</h1>
                            <p>THE GATE IS OPEN. VECNA IS WAITING.</p>
                            <p>Video unavailable. Check the video file and format.</p>
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
