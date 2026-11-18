export const GAME_CONFIG = {
    QUESTION_TIME: 10,
    TOTAL_QUESTIONS: 10,
    MAX_LIVES: 5,
} as const;

// Keep these exports so existing imports don't break.
export const QUESTION_TIME = GAME_CONFIG.QUESTION_TIME;
export const TOTAL_QUESTIONS = GAME_CONFIG.TOTAL_QUESTIONS;
export const MAX_LIVES = GAME_CONFIG.MAX_LIVES;