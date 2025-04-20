import type { BaseSheet } from "@/types/base-game";
import { ResultField } from "./result-field";
import { ScoreField } from "./score-field";

export function Game({ game }: { game: ElementOf<BaseSheet["games"]> }) {
  return (
    <div>
      <ScoreField name="ones" gameIndex={game.index} />
      <ScoreField name="twos" gameIndex={game.index} />
      <ScoreField name="threes" gameIndex={game.index} />
      <ScoreField name="fours" gameIndex={game.index} />
      <ScoreField name="fives" gameIndex={game.index} />
      <ScoreField name="sixes" gameIndex={game.index} />
      <ResultField name="topResult" gameIndex={game.index} />
      <ResultField name="topBonus" gameIndex={game.index} />
      <ResultField name="topTotal" gameIndex={game.index} />

      <ScoreField name="threeOfAKind" gameIndex={game.index} />
      <ScoreField name="fourOfAKind" gameIndex={game.index} />
      <ScoreField name="fullHouse" gameIndex={game.index} />
      <ScoreField name="smallStraight" gameIndex={game.index} />
      <ScoreField name="largeStraight" gameIndex={game.index} />
      <ScoreField name="yahtzee" gameIndex={game.index} />
      <ScoreField name="chance" gameIndex={game.index} />
      <ResultField name="bottomResult" gameIndex={game.index} />
      <ResultField name="topTotal" gameIndex={game.index} />
      <ResultField name="total" gameIndex={game.index} />
    </div>
  );
}
