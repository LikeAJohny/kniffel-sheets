import { cn } from "@/lib/utils";
import { validateScoreField } from "@/rules/base-game";
import { useScoreField } from "@/state/base-game.jotai";
import type { BaseScoreField } from "@/types/base-game";
import { useState, type ChangeEvent } from "react";
import { Input } from "../ui/input";

export function ScoreField({
  name,
  gameIndex,
}: {
  name: BaseScoreField;
  gameIndex: number;
}) {
  const [score, setScore] = useScoreField(gameIndex, name);
  const [value, setValue] = useState(score?.toString() || "");
  const [msg, setMsg] = useState("");
  const err = msg !== "";

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const score = parseInt(e.target.value);

    if (isNaN(score)) {
      setValue("");
      setMsg("");
    } else {
      setValue(score.toString());
    }
  };

  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const score = parseInt(e.target.value);

    if (isNaN(score)) return;

    const valid = validateScoreField(name, score);
    if (!valid) {
      setMsg("Invalid input");
    } else {
      setMsg("");
      setScore(score);
    }
  };

  return (
    <Input
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      className={cn(
        "w-14 h-8 rounded-none text-center text-sm",
        err ? "bg-red-300 text-red-900" : "",
      )}
    />
  );
}
