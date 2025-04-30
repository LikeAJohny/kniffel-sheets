import type { Player } from "./player";

export type BaseSheet = {
  id: string | null;
  player: Player | null;
  variant: "base";
  score: number;
  games: BaseGame[];
  startedAt: Date;
  lastRollAt: Date | null;
  finishedAt: Date | null;
};

export type BaseGame = {
  index: number;
  scores: BaseScores;
  results: BaseResults;
};

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
  bottomTotal: number | null;
  total: number | null;
};

export type BaseScoreField = keyof BaseScores;

export type BaseScoreFieldRule = {
  min?: number;
  max?: number;
  div?: number;
  eq?: number;
};

export type BaseScoreFieldValidator = (
  field: BaseScoreField,
  score: number | null,
) => boolean;
