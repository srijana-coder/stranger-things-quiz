
import { supabase } from "../lib/supabase.js";
import type { Survivor } from "../types/game.types.js";

export async function fetchLeaderboard(): Promise<Survivor[]> {
    const { data, error } = await supabase
        .from("leaderboard")
        .select("player_name, score")
        .order("score", { ascending: false })
        .order("created_at", { ascending: true })
        .limit(10);

    if (error) {
        throw error;
    }

    return (data ?? []).map((player) => ({
        name: player.player_name,
        score: player.score,
    }));
}

export async function submitScore(
    name: string,
    score: number,
): Promise<void> {
    if (!name.trim() || !Number.isInteger(score) || score < 0 || score > 10) {
        throw new Error("Invalid player name or score.");
    }

    const { error } = await supabase
        .from("leaderboard")
        .insert({
            player_name: name.trim(),
            score,
        });

    if (error) {
        throw error;
    }
}
