export const AUDIO_CONFIG = {
    cinematic: {
        src: "/sounds/vecna-theme.mp3",
        loop: true,
    },
    opening: {
        src: "/sounds/stranger_things.mp3",
        loop: true,
    },
    gameplay: {
        src: "/sounds/Kate_Bush_-_Running_Up_That_Hill_maxi_(mp3.pm).mp3",
        loop: true,
    },
    death: {
        src: "/sounds/vecna_clock.mp3",
        loop: true,
    },
    victory: {
        src: "/sounds/heroes-victory.mp3",
        loop: false,
    },
} as const;

export const DEFAULT_AUDIO_SETTINGS = {
    volume: 0.65,
    muted: false,
} as const;