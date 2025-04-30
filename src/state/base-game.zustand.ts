import type {
  BaseResults,
  BaseScoreField,
  BaseScores,
  BaseSheet,
} from "@/types/base-game";
import type { Player } from "@/types/player";
import { produce } from "immer";
import { create } from "zustand";

type AppStore = {
  user: Player | null;
  sheet: BaseSheet | null;
};

export const useAppStore = create<AppStore>(() => ({
  user: null,
  sheet: null,
}));

export const startSheet = (gamesCount: number) => {
  const games = Array.from({ length: gamesCount }, (_, index) => ({
    index,
    scores: { ...initialScores },
    results: { ...initialResults },
  }));

  useAppStore.setState({ sheet: initialSheet(games) });
};

export const score = (
  gameIndex: number,
  field: BaseScoreField,
  score: number | null,
) => {
  const sheet = useAppStore.getState().sheet;
  if (!sheet) return;

  const game = sheet.games.find((g) => g.index === gameIndex);
  if (!game) return;

  const uGame = produce(game, (draft) => {
    draft.scores[field] = score;
  });

  const uSheet = produce(sheet, (draft) => {
    draft.games[gameIndex] = uGame;
  });

  useAppStore.setState({ sheet: uSheet });
};

const initialSheet = (games: BaseSheet["games"] = []): BaseSheet => {
  return {
    id: null,
    player: null,
    variant: "base",
    score: 0,
    games,
    startedAt: new Date(),
    lastRollAt: null,
    finishedAt: null,
  };
};

const initialScores: BaseScores = {
  ones: null,
  twos: null,
  threes: null,
  fours: null,
  fives: null,
  sixes: null,
  threeOfAKind: null,
  fourOfAKind: null,
  fullHouse: null,
  smallStraight: null,
  largeStraight: null,
  yahtzee: null,
  chance: null,
};

const initialResults: BaseResults = {
  topResult: null,
  topBonus: null,
  topTotal: null,
  bottomTotal: null,
  total: null,
};
