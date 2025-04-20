import type {
  BaseResults,
  BaseScores,
  BaseSheet,
  ScoreField,
} from "@/types/base-game";
import { atom, useAtom, useAtomValue } from "jotai";
import { atomFamily, atomWithStorage } from "jotai/utils";
import { useMemo } from "react";
import { v4 as uuid } from "uuid";

const initialSheet = (games: BaseSheet["games"] = []): BaseSheet => {
  return {
    id: uuid(),
    player: null,
    games,
    startedAt: new Date(),
    lastMoveAt: null,
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
  bottomResult: null,
  total: null,
};

export const sheetAtom = atomWithStorage<BaseSheet | null>("sheet", null);

export const scoreFieldAtom = atomFamily(
  (param: { gameIndex: number; field: ScoreField }) =>
    atom(
      (get) => {
        const sheet = get(sheetAtom);
        if (!sheet) return null;

        return sheet.games[param.gameIndex].scores[param.field];
      },
      (get, set, newValue) => {
        const sheet = get(sheetAtom);
        if (!sheet) return;

        const updatedGames = sheet.games.map((game, idx) => {
          if (idx !== param.gameIndex) return game;

          return {
            ...game,
            scores: {
              ...game.scores,
              [param.field]: newValue,
            },
          };
        });

        set(sheetAtom, {
          ...sheet,
          games: updatedGames,
        });
      },
    ),
  (a, b) => a.gameIndex === b.gameIndex && a.field === b.field,
);

export const gameResultsAtom = atomFamily(
  (param: { gameIndex: number }) =>
    atom<BaseResults>((get) => {
      const sheet = get(sheetAtom);
      if (!sheet || !sheet.games[param.gameIndex]) {
        return { ...initialResults };
      }
      const { scores } = sheet.games[param.gameIndex];

      const topScores = [
        scores.ones,
        scores.twos,
        scores.threes,
        scores.fours,
        scores.fives,
        scores.sixes,
      ];
      const topResult = topScores
        .filter((s) => s !== null)
        .reduce((a, v) => a + v, 0);

      let topBonus = null;
      if (topResult >= 63) topBonus = 35;
      else {
        if (topScores.length < 6) topBonus = null;
        else topBonus = 0;
      }

      const topTotal = topResult + (topBonus ?? 0);

      const bottomScores = [
        scores.threeOfAKind,
        scores.fourOfAKind,
        scores.fullHouse,
        scores.smallStraight,
        scores.largeStraight,
        scores.yahtzee,
        scores.chance,
      ];
      const bottomResult = bottomScores
        .filter((s) => s != null)
        .reduce((a, v) => a + v, 0);

      return {
        topResult,
        topBonus,
        topTotal,
        bottomResult,
        total: topTotal + bottomResult,
      };
    }),
  (a, b) => a.gameIndex === b.gameIndex,
);

export const useSheet = () => {
  const [sheet, setSheet] = useAtom(sheetAtom);

  const start = (gamesCount: number) => {
    const games = Array.from({ length: gamesCount }, (_, index) => ({
      index,
      scores: { ...initialScores },
      results: { ...initialResults },
    }));
    setSheet(initialSheet(games));
  };

  return { sheet, start };
};

export const useScoreField = (gameIndex: number, field: ScoreField) => {
  const atom = useMemo(
    () => scoreFieldAtom({ gameIndex, field }),
    [gameIndex, field],
  );

  return useAtom(atom);
};

export function useResultField(gameIndex: number) {
  const resultsAtom = useMemo(
    () => gameResultsAtom({ gameIndex }),
    [gameIndex],
  );

  return useAtomValue(resultsAtom);
}
