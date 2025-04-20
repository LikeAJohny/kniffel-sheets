import { useResultField } from "@/state/base-game.jotai";
import type { BaseResults } from "@/types/base-game";
import { Input } from "../ui/input";

export function ResultField({
  gameIndex,
  name,
}: {
  gameIndex: number;
  name: keyof BaseResults;
}) {
  const results = useResultField(gameIndex);
  const value = results[name];

  let val = "";
  if (value === 0) val = "-";
  else if (value !== null) val = value.toString();

  return (
    <Input
      value={val}
      disabled
      className="w-14 h-8 rounded-none text-center text-sm"
    />
  );
}
