export type ScoreField =
  | "ones"
  | "twos"
  | "threes"
  | "fours"
  | "fives"
  | "sixes"
  | "threeOfAKind"
  | "fourOfAKind"
  | "fullHouse"
  | "smallStraight"
  | "largeStraight"
  | "yahtzee"
  | "chance";

export type ScoreFieldRule = {
  min?: number;
  max?: number;
  div?: number;
  eq?: number;
};

export type ScoreFieldValidator = (
  field: ScoreField,
  score: number | null,
) => boolean;

export type BaseScores = {
  ones: number | null;
  twos: number | null;
  threes: number | null;
  fours: number | null;
  fives: number | null;
  sixes: number | null;
  threeOfAKind: number | null;
  fourOfAKind: number | null;
  fullHouse: number | null;
  smallStraight: number | null;
  largeStraight: number | null;
  yahtzee: number | null;
  chance: number | null;
};

export type BaseResults = {
  topResult: number | null;
  topBonus: number | null;
  topTotal: number | null;
  bottomResult: number | null;
  total: number | null;
};

export type BaseGame = {
  index: number;
  scores: BaseScores;
  results: BaseResults;
};

export type BaseSheet = {
  id: string | null;
  player: string | null;
  games: BaseGame[];
  startedAt: Date;
  lastMoveAt: Date | null;
  finishedAt: Date | null;
};
