
import type { CSSProperties } from "react";

type VecnaProps = {
    wrongCount: number;
    attacking: boolean;
    death?: boolean;
};

export default function Vecna({
                                  wrongCount,
                                  attacking,
                                  death = false,
                              }: VecnaProps) {
    const danger = Math.min(wrongCount, 5);
    const scale = death ? 1.35 : 0.72 + danger * 0.105;

    return (
        <div
            className={`vecna ${attacking ? "vecna-attack" : ""} ${death ? "vecna-death" : ""}`}
            style={
                {
                    "--vecna-scale": scale,
                    "--vecna-opacity": death ? 1 : 0.08 + danger * 0.17,
                    "--vecna-danger": danger,
                    "--vecna-lunge-scale": scale * 1.12,
                    "--vecna-breathe-scale": scale * 1.018,
                    "--vecna-saturation": 0.7 + danger * 0.12,
                    "--vecna-brightness": 0.45 + danger * 0.1,
                    "--vecna-shadow-size": `${8 + danger * 7}px`,
                    "--vecna-shadow-alpha": 0.18 + danger * 0.1,
                    "--vecna-eye-opacity": danger * 0.13,
                    "--vecna-glow-alpha": 0.12 + danger * 0.055,
                } as CSSProperties
            }
            aria-hidden={!death}
        >
            <div className="vecna-glow" />
            <img
                src="/images/vecna_pic.jpg"
                alt={death ? "Vecna emerging from the Upside Down" : ""}
                draggable={false}
            />
            <div className="vecna-eye-glow" />
        </div>
    );
}
