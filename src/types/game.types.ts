export type Screen =
    | "intro"
    | "start"
    | "quiz"
    | "claimed"
    | "results"
    | "leaderboard";

export type Question = {
    question: string;
    options: string[];
    answer: number;
    detail: string;
};

export type Survivor = {
    name: string;
    score: number;
};