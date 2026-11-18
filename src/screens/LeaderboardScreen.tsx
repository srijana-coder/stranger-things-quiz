
import type { Survivor } from "../types/game.types.js";

type LeaderboardScreenProps = {
    board: Survivor[];
    onReturnHome: () => void;
};

export default function LeaderboardScreen({
                                              board,
                                              onReturnHome,
                                          }: LeaderboardScreenProps) {
    return (
        <main className="leaderboard-screen">
            <div className="eyebrow">HAWKINS HIGH SCHOOL</div>

            <h1 className="leaderboard-title">TOP SURVIVORS</h1>

            <p className="leaderboard-subtitle">
                THE ONES WHO MADE IT BACK
            </p>

            <div className="leaderboard-list">
                {board.length === 0 ? (
                    <p className="leaderboard-subtitle">
                        NO SURVIVORS YET. BE THE FIRST!
                    </p>
                ) : (
                    board.map((entry, i) => (
                    <div
                        className={`leader-row ${i < 3 ? "top-rank" : ""}`}
                        key={`${entry.name}-${i}`}
                    >
            <span className="rank">
              {i < 3 ? (
                  <i className={`medal medal-${i + 1}`}>{i + 1}</i>
              ) : (
                  `#${i + 1}`
              )}
            </span>

                        <strong>{entry.name}</strong>
                        <span>{entry.score} PTS</span>
                    </div>
                    )))}
            </div>

            <button
                className="primary-button leaderboard-return-button"
                onClick={onReturnHome}
            >
                RETURN TO HAWKINS →
            </button>
        </main>
    );
}
