
type SoundControlsProps = {
    muted: boolean;
    volume: number;
    onToggleSound: () => void;
    onVolumeChange: (value: number) => void;
};

export default function SoundControls({
                                          muted,
                                          volume,
                                          onToggleSound,
                                          onVolumeChange,
                                      }: SoundControlsProps) {
    return (
        <>
            <button
                type="button"
                className="sound-button"
                onClick={onToggleSound}
                aria-label={muted ? "Unmute sound" : "Mute sound"}
            >
                {muted ? "SOUND OFF" : "SOUND ON"}
            </button>

            <label className="volume-control">
                <span>VOLUME</span>
                <input
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={volume}
                    onChange={(event) =>
                        onVolumeChange(Number(event.target.value))
                    }
                    aria-label="Game volume"
                />
            </label>
        </>
    );
}
