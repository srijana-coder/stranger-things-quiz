import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import "./App.css";

import { questions } from "./constants/questions.js";
import { QUESTION_TIME } from "./constants/gameConfig.js";

import { audio } from "./services/audioService.js";
import {
  fetchLeaderboard,
  submitScore,
} from "./services/leaderboardService.js";

import Particles from "./components/Particles.js";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";

import IntroScreen from "./screens/IntroScreen.js";
import HomeScreen from "./screens/HomeScreen.js";
import QuizScreen from "./screens/QuizScreen.js";
import DeathScreen from "./screens/DeathScreen.js";
import ResultsScreen from "./screens/ResultsScreen.js";
import LeaderboardScreen from "./screens/LeaderboardScreen.js";

import { useTimer } from "./hooks/useTimer.js";
import { useSound } from "./hooks/useSound.js";
import { useGame } from "./hooks/useGame.js";


import type { Screen, Survivor } from "./types/game.types.js";



export default function App() {
  const [screen, setScreen] = useState<Screen>(() =>
      sessionStorage.getItem("vecna-intro-seen") ? "start" : "intro",
  );
  const [introStarted, setIntroStarted] = useState(false);
  const [introVideoFailed, setIntroVideoFailed] = useState(false);
  const [name, setName] = useState("");
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(65);

  const { toggleSound, changeVolume } = useSound({
    muted,
    setMuted,
    volume,
    setVolume,

  });

  const [board, setBoard] = useState<Survivor[]>([]);

  const addToBoard = useCallback(
      async (playerScore: number) => {
        try {
          await submitScore(name.trim().toUpperCase(), playerScore);

          const updatedBoard = await fetchLeaderboard();
          setBoard(updatedBoard);
        } catch (error) {
          console.error("Failed to save leaderboard score:", error);
        }
      },
      [name],
  );

  useEffect(() => {
    if (screen !== "leaderboard") return;

    let cancelled = false;

    fetchLeaderboard()
        .then((data) => {
          if (!cancelled) {
            setBoard(data);
          }
        })
        .catch((error) => {
          console.error("Failed to load leaderboard:", error);
        });

    return () => {
      cancelled = true;
    };
  }, [screen]);

  const appRef = useRef<HTMLDivElement>(null);


  const game = useGame({
    name,
    screen,
    setScreen,
    addToBoard,
  });

  const {
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
  } = game;

  useTimer({
    screen,
    answered,
    index,
    timeLeft,
    setTimeLeft,
    resolveAnswer,
  });


  useEffect(() => {
    const app = appRef.current;
    if (!app) return;
    let frame = 0;
    const handlePointer = (event: PointerEvent) => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const x = event.clientX / window.innerWidth;
        const y = event.clientY / window.innerHeight;
        app.style.setProperty("--pointer-x", `${x * 100}%`);
        app.style.setProperty("--pointer-y", `${y * 100}%`);
        app.style.setProperty("--parallax-x", `${(x - 0.5) * 24}px`);
        app.style.setProperty("--parallax-y", `${(y - 0.5) * 18}px`);
        app.style.setProperty("--spore-parallax-x", `${(x - 0.5) * -8}px`);
        app.style.setProperty("--spore-parallax-y", `${(y - 0.5) * -6}px`);
        app.style.setProperty("--vecna-parallax-x", `${(x - 0.5) * 5}px`);
        app.style.setProperty("--vecna-parallax-y", `${(y - 0.5) * 3}px`);
      });
    };
    window.addEventListener("pointermove", handlePointer, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", handlePointer);
    };
  }, []);

  useEffect(() => {
    if (screen === "intro" && introStarted) {
      audio.playCinematic();
    }

    if (screen === "start") {
      audio.playOpening();
    }
  }, [screen, introStarted]);




  function skipIntro() {
    sessionStorage.setItem("vecna-intro-seen", "true");
    audio.stopAll();
    setScreen("start");
  }

  function returnHome() {
    audio.stopAll();

    game.clearPendingAdvance();
    game.resetAnswerLock();

    setScreen("start");
  }

  const percent = (timeLeft / QUESTION_TIME) * 100;
  const resultLabel =
      score === 10
          ? "PERFECT SURVIVOR"
          : score === 9
              ? "LEGENDARY SURVIVOR"
              : score === 8
                  ? "HAWKINS HERO"
                  : score === 7
                      ? "ESCAPED VECNA"
                      : score === 6
                          ? "BARELY SURVIVED"
                          : "SURVIVED BY A NARROW MARGIN";

  return (
      <div
          ref={appRef}
          className={`app danger-${Math.min(wrongCount, 5)} ${screen === "quiz" && wrongCount > 0 ? "danger-mode" : ""} ${screen === "claimed" ? "death-mode" : ""}`}
      >
        <div className="background-glow" />
        <div className="cursor-light" />
        <div className="fog fog-one" />
        <div className="fog fog-two" />
        <div className="vines" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </div>
        <div
            className="lightning"
            style={
              {
                "--lightning-danger": wrongCount,
                "--lightning-alpha": Math.min(wrongCount, 5) * 0.035,
                "--lightning-speed": `${10 - Math.min(wrongCount, 5) * 0.65}s`,
              } as CSSProperties
            }
        />
        <Particles intensity={wrongCount} />

        {screen !== "intro" && (
            <Header
                isQuiz={screen === "quiz"}
                timeLeft={timeLeft}
                score={score}
                muted={muted}
                volume={volume}
                onReturnHome={returnHome}
                onToggleSound={toggleSound}
                onVolumeChange={changeVolume}
            />
        )}



        {screen === "intro" && (
            <IntroScreen
                introStarted={introStarted}
                introVideoFailed={introVideoFailed}
                muted={muted}
                volume={volume}
                onBeginIntro={() => {
                  setIntroStarted(true);
                }}
                onVideoError={() => setIntroVideoFailed(true)}
                skipIntro={skipIntro}
                toggleSound={toggleSound}
                changeVolume={changeVolume}
            />
        )}

        {screen === "start" && (
            <HomeScreen
                name={name}
                setName={setName}
                startGame={startGame}
            />
        )}



        {screen === "quiz" && (
            <QuizScreen
                answered={answered}
                selected={selected}
                current={current}
                index={index}
                totalQuestions={questions.length}
                percent={percent}
                timeLeft={timeLeft}
                timedOut={timedOut}
                wrongCount={wrongCount}
                resolveAnswer={resolveAnswer}
            />
        )}

        {screen === "claimed" && (
            <DeathScreen
                name={name}
                score={score}
                wrongCount={wrongCount}
                onTryAgain={startGame}
                onViewLeaderboard={() => setScreen("leaderboard")}
            />
        )}

        {screen === "results" && (
            <ResultsScreen
                name={name}
                score={score}
                wrongCount={wrongCount}
                totalQuestions={questions.length}
                resultLabel={resultLabel}
                onPlayAgain={startGame}
                onLeaderboard={() => setScreen("leaderboard")}
            />
        )}

        {screen === "leaderboard" && (
            <LeaderboardScreen
                board={board}
                onReturnHome={returnHome}
            />
        )}

        {screen !== "intro" && <Footer />}
      </div>
  );
}
