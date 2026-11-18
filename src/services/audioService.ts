
import {
    AUDIO_CONFIG,
    DEFAULT_AUDIO_SETTINGS,
} from "../constants/audioConfig.js";

class SoundController {
    private ctx: AudioContext | null = null;
    private cinematic: HTMLAudioElement | null = null;
    private opening: HTMLAudioElement | null = null;
    private gameplay: HTMLAudioElement | null = null;
    private death: HTMLAudioElement | null = null;
    private victory: HTMLAudioElement | null = null;
    private vecnaVoice: HTMLAudioElement | null = null;
    private fadeTimer: number | null = null;
    private muted: boolean = DEFAULT_AUDIO_SETTINGS.muted;
    private volume: number = DEFAULT_AUDIO_SETTINGS.volume;

    private ensureTracks() {
        if (this.opening) return;

        this.cinematic = new Audio(AUDIO_CONFIG.cinematic.src);
        this.cinematic.loop = AUDIO_CONFIG.cinematic.loop;

        this.opening = new Audio(AUDIO_CONFIG.opening.src);
        this.opening.loop = AUDIO_CONFIG.opening.loop;

        this.gameplay = new Audio(AUDIO_CONFIG.gameplay.src);
        this.gameplay.loop = AUDIO_CONFIG.gameplay.loop;

        this.death = new Audio(AUDIO_CONFIG.death.src);
        this.death.loop = AUDIO_CONFIG.death.loop;

        this.victory = new Audio(AUDIO_CONFIG.victory.src);
        this.victory.loop = AUDIO_CONFIG.victory.loop;

        this.syncTracks();
    }

    private syncTracks() {
        [
            this.cinematic,
            this.opening,
            this.gameplay,
            this.death,
            this.victory,
        ].forEach((track) => {
            if (!track) return;

            track.muted = this.muted;
            track.volume = this.muted ? 0 : this.volume;
        });
    }

    private getContext() {
        if (!this.ctx) {
            const AudioContextClass =
                window.AudioContext ||
                (
                    window as Window & {
                        webkitAudioContext?: typeof AudioContext;
                    }
                ).webkitAudioContext;

            if (AudioContextClass) this.ctx = new AudioContextClass();
        }

        if (this.ctx?.state === "suspended") {
            void this.ctx.resume();
        }

        return this.ctx;
    }

    setMuted(value: boolean) {
        this.muted = value;
        this.ensureTracks();
        this.syncTracks();
        if (value && this.vecnaVoice) {
            this.vecnaVoice.pause();
            this.vecnaVoice.currentTime = 0;
        }
    }

    setVolume(value: number) {
        this.volume = value;
        this.ensureTracks();
        this.syncTracks();
    }

    private stopFade() {
        if (this.fadeTimer !== null) window.clearInterval(this.fadeTimer);
        this.fadeTimer = null;
    }

    private stopTrack(track: HTMLAudioElement | null, reset = true) {
        if (!track) return;
        track.pause();
        if (reset) track.currentTime = 0;
        track.volume = this.volume;
    }

    private fadeOut(
        track: HTMLAudioElement | null,
        duration: number,
        onDone?: () => void
    ) {
        if (!track || track.paused) {
            onDone?.();
            return;
        }

        this.stopFade();
        const start = track.volume;
        const steps = 20;
        let step = 0;

        this.fadeTimer = window.setInterval(() => {
            step += 1;
            track.volume = Math.max(0, start * (1 - step / steps));

            if (step >= steps) {
                this.stopFade();
                this.stopTrack(track);
                onDone?.();
            }
        }, duration / steps);
    }

    playCinematic() {
        this.ensureTracks();
        this.stopFade();

        this.stopTrack(this.opening);
        this.stopTrack(this.gameplay);
        this.stopTrack(this.death);
        this.stopTrack(this.victory);

        if (!this.cinematic) return;

        this.cinematic.currentTime = 0;
        this.cinematic.volume = this.muted ? 0 : this.volume;
        this.cinematic.muted = this.muted;

        void this.cinematic.play().catch(() => undefined);
    }

    playOpening() {
        this.ensureTracks();
        this.stopFade();

        this.stopTrack(this.cinematic);
        this.stopTrack(this.gameplay);
        this.stopTrack(this.death);
        this.stopTrack(this.victory);

        if (!this.opening) return;

        this.opening.currentTime = 0;
        this.opening.volume = this.muted ? 0 : this.volume;
        this.opening.muted = this.muted;

        void this.opening.play().catch(() => undefined);
    }

    playGameplay() {
        this.ensureTracks();
        this.stopFade();

        // Stop all other background music
        this.stopTrack(this.opening);
        this.stopTrack(this.death);
        this.stopTrack(this.victory);

        if (!this.gameplay) return;

        this.gameplay.currentTime = 0;
        this.gameplay.loop = true;
        this.gameplay.volume = this.volume;
        this.gameplay.muted = this.muted;

        this.gameplay.play().catch((error) => {
            console.error("Gameplay music failed:", error);
        });
    }

    stopGameplay() {
        this.stopTrack(this.gameplay);
    }

    playVictory() {
        this.ensureTracks();
        this.stopFade();

        this.stopTrack(this.opening);
        this.stopTrack(this.gameplay);
        this.stopTrack(this.death);

        if (!this.victory) return;

        this.victory.currentTime = 0;
        this.victory.muted = this.muted;
        this.victory.volume = this.volume;

        void this.victory.play().catch(() => undefined);
    }


    startDeath() {
        this.ensureTracks();
        this.stopFade();

        // Stop opening and victory music completely.
        this.stopTrack(this.opening);
        this.stopTrack(this.victory);

        // Stop any previous death track.
        this.stopTrack(this.death);

        // Fade out gameplay music before starting Vecna's music.
        this.fadeOut(this.gameplay, 750, () => {
            if (!this.death) return;

            this.death.currentTime = 0;
            this.death.loop = true;
            this.death.muted = this.muted;
            this.death.volume = this.muted ? 0 : this.volume;

            void this.death.play().catch(() => undefined);
        });

        this.bassImpact();

        window.setTimeout(() => this.attack(true), 650);
    }

    private playVecnaVoice(finalKill = false) {
        // Stop the previous Vecna dialogue.
        if (this.vecnaVoice) {
            this.vecnaVoice.pause();
            this.vecnaVoice.currentTime = 0;
        }

        const voiceFiles = [
            "/sounds/vecna/vecna-01.mp3",
            "/sounds/vecna/vecna-02.mp3",
            "/sounds/vecna/vecna-03.mp3",
            "/sounds/vecna/vecna-04.mp3",
            "/sounds/vecna/vecna-05.mp3",
        ];

        const selectedVoice = finalKill
            ? "/sounds/vecna/vecna-final.mp3"
            : voiceFiles[Math.floor(Math.random() * voiceFiles.length)];

        this.vecnaVoice = new Audio(selectedVoice);
        this.vecnaVoice.volume = this.muted ? 0 : this.volume;
        this.vecnaVoice.muted = this.muted;

        void this.vecnaVoice.play().catch((error) => {
            console.error("Vecna voice failed:", error);
        });
    }

    private bassImpact() {
        if (this.muted) return;

        const ctx = this.getContext();
        if (!ctx) return;

        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(72, now);
        osc.frequency.exponentialRampToValueAtTime(24, now + 1.4);

        gain.gain.setValueAtTime(0.28, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.5);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 1.55);
    }

    attack(finalKill = false) {
        if (this.muted) return;

        const ctx = this.getContext();

        if (ctx) {
            const now = ctx.currentTime;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = "sawtooth";
            osc.frequency.setValueAtTime(finalKill ? 75 : 95, now);
            osc.frequency.exponentialRampToValueAtTime(28, now + 1.7);

            gain.gain.setValueAtTime(0.18, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 1.8);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start(now);
            osc.stop(now + 1.85);
        }

        this.playVecnaVoice(finalKill);
    }

    stopAll() {
        this.stopFade();
        this.stopTrack(this.cinematic);
        this.stopTrack(this.opening);
        this.stopTrack(this.gameplay);
        this.stopTrack(this.death);
        this.stopTrack(this.victory);
        if (this.vecnaVoice) {
            this.vecnaVoice.pause();
            this.vecnaVoice.currentTime = 0;
        }
    }
}

export const audio = new SoundController();