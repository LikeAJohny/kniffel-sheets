import { resultsAtom } from "@/state/base-game";
import { useAtom } from "jotai";
import { ResultField } from "./result-field";
import { ScoreField } from "./score-field";

export function Game() {
  const [results] = useAtom(resultsAtom);

  return (
    <div>
      <ScoreField name="ones" />
      <ScoreField name="ones" />
      <ScoreField name="twos" />
      <ScoreField name="threes" />
      <ScoreField name="fours" />
      <ScoreField name="fives" />
      <ScoreField name="sixes" />
      <ResultField value={results.topResult} />
      <ResultField value={results.topBonus} />
      <ResultField value={results.topTotal} />

      <ScoreField name="threeOfAKind" />
      <ScoreField name="fourOfAKind" />
      <ScoreField name="fullHouse" />
      <ScoreField name="smallStraight" />
      <ScoreField name="largeStraight" />
      <ScoreField name="yahtzee" />
      <ScoreField name="chance" />
      <ResultField value={results.bottomResult} />
      <ResultField value={results.topTotal} />
      <ResultField value={results.total} />
    </div>
  );
}
