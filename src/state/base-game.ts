import type { BaseScores } from "@/types/base-game";
import { atom } from "jotai";

export const scoresAtom = atom<BaseScores>({
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
});

export const resultsAtom = atom((get) => {
  const scores = get(scoresAtom);
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
});
