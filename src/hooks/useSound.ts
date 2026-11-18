import { useCallback, useEffect } from "react";
import { audio } from "../services/audioService.js";

type UseSoundProps = {
    muted: boolean;
    setMuted: React.Dispatch<React.SetStateAction<boolean>>;
    volume: number;
    setVolume: React.Dispatch<React.SetStateAction<number>>;
};

export function useSound({
                             muted,
                             setMuted,
                             volume,
                             setVolume,
                         }: UseSoundProps) {
    const toggleSound = useCallback(() => {
        setMuted((previous) => !previous);
    }, [setMuted]);

    const changeVolume = useCallback(
        (value: number) => {
            setVolume(value);
        },
        [setVolume],
    );

    useEffect(() => {
        audio.setMuted(muted);
    }, [muted]);

    useEffect(() => {
        audio.setVolume(volume / 100);
    }, [volume]);

    return { toggleSound, changeVolume };
}