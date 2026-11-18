
type LivesProps = {
    lives: number;
    maxLives?: number;
};

export default function LifeBar({ lives, maxLives = 5 }: LivesProps) {
    return (
        <div
            className="lives-container"
            role="img"
            aria-label={`${lives} lives remaining`}
        >
            {Array.from({ length: maxLives }, (_, index) => (
                <span
                    key={index}
                    className={`life-heart ${index < lives ? "life-active" : "life-lost"}`}
                >
          ♥
        </span>
            ))}
        </div>
    );
}
