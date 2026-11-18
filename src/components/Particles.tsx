
import { useMemo } from "react";
import type { CSSProperties } from "react";

type ParticlesProps = {
    intensity?: number;
};

export default function Particles({ intensity = 0 }: ParticlesProps) {
    const particles = useMemo(
        () =>
            Array.from({ length: 52 }, (_, i) => ({
                id: i,
                left: `${(i * 37) % 100}%`,
                delay: `${-(i % 12) * 0.8}s`,
                duration: `${7 + (i % 8)}s`,
                size: `${2 + (i % 4)}px`,
                drift: `${(i % 2 ? 1 : -1) * (15 + (i % 5) * 7)}px`,
            })),
        [],
    );

    const danger = Math.min(intensity, 5);
    return (
        <div
            className="particles"
            style={
                {
                    "--spore-danger": intensity,
                    "--spore-opacity": 0.28 + danger * 0.05,
                    "--spore-glow": 0.25 + danger * 0.08,
                } as CSSProperties
            }
            aria-hidden="true"
        >
            {particles.map((particle) => (
                <i
                    key={particle.id}
                    style={
                        {
                            left: particle.left,
                            animationDelay: particle.delay,
                            animationDuration: particle.duration,
                            width: particle.size,
                            height: particle.size,
                            "--spore-drift": particle.drift,
                        } as CSSProperties
                    }
                />
            ))}
        </div>
    );
}
