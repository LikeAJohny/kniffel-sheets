import { cn } from "@/lib/utils";
import { validateScoreField } from "@/rules/base-game";
import { scoresAtom } from "@/state/base-game";
import type { ScoreField } from "@/types/base-game";
import { useAtom } from "jotai";
import { useState, type ChangeEvent } from "react";
import { Input } from "../ui/input";

export function ScoreField({ name }: { name: ScoreField }) {
  const [scores, setScores] = useAtom(scoresAtom);
  const [value, setValue] = useState(scores[name]?.toString() || "");
  const [msg, setMsg] = useState("");
  const err = msg !== "";

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const v = parseInt(e.target.value);

    if (isNaN(v)) {
      setValue("");
      setMsg("");
    } else {
      setValue(v.toString());
    }
  };

  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const v = parseInt(e.target.value);

    if (isNaN(v)) return;

    const valid = validateScoreField(name, v);
    if (!valid) {
      setMsg("Invalid input");
    } else {
      setMsg("");
      setScores({ ...scores, [name]: v });
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
