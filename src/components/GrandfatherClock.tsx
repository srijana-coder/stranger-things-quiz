
type GrandfatherClockProps = {
    className?: string;
    label: string;
};

export default function GrandfatherClock({
                                             className = "",
                                             label,
                                         }: GrandfatherClockProps) {
    return (
        <div
            className={`grandfather-clock ${className}`}
            role="img"
            aria-label={label}
        >
            <div className="clock-face">
                <i />
                <b />
            </div>
            <div className="clock-body">
                <span />
            </div>
        </div>
    );
}
