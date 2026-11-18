
type TimerProps = {
    timeLeft: number;
};

export default function Timer({ timeLeft }: TimerProps) {
    return (
        <div
            className={`stat ${timeLeft <= 3 ? "critical" : ""}`}
            aria-live="off"
        >
            <small>TIME LEFT</small>
            <strong>00:{String(timeLeft).padStart(2, "0")}</strong>
        </div>
    );
}
