import type {
  ScoreField,
  ScoreFieldRule,
  ScoreFieldValidator,
} from "@/types/base-game";

export const scoreFieldRules: Record<ScoreField, ScoreFieldRule> = {
  ones: { min: 0, max: 5, div: 1 },
  twos: { min: 0, max: 10, div: 2 },
  threes: { min: 0, max: 15, div: 3 },
  fours: { min: 0, max: 20, div: 4 },
  fives: { min: 0, max: 25, div: 5 },
  sixes: { min: 0, max: 30, div: 6 },
  threeOfAKind: { min: 5, max: 30 },
  fourOfAKind: { min: 5, max: 30 },
  fullHouse: { eq: 25 },
  smallStraight: { eq: 30 },
  largeStraight: { eq: 40 },
  yahtzee: { eq: 50 },
  chance: { min: 5, max: 30 },
};

export const validateScoreField: ScoreFieldValidator = (
  field: ScoreField,
  score: number | null,
) => {
  const rule = scoreFieldRules[field];

  if (score === null) return false;

  if (rule.div && score % rule.div !== 0) return false;
  if (rule.min && score < rule.min) return false;
  if (rule.max && score > rule.max) return false;
  if (rule.eq && score !== rule.eq) return false;

  return true;
};
