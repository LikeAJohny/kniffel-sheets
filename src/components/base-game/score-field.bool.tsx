import { cn } from "@/lib/utils";
import { useScoreField } from "@/state/base-game.jotai";
import type { BaseScoreField } from "@/types/base-game";
import { Check, Minus } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export function ScoreFieldBool({
  name,
  scoreValue,
  gameIndex,
}: {
  name: BaseScoreField;
  scoreValue: number;
  gameIndex: number;
}) {
  const [score, setScore] = useScoreField(gameIndex, name);
  const [value, setValue] = useState(score?.toString() || "");
  const [open, setOpen] = useState(false);

  const check = () => {
    setScore(scoreValue);
    setValue(scoreValue.toString());
    setOpen(false);
  };

  const strike = () => {
    setScore(0);
    setValue("-");
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Input
          value={value}
          className={cn("w-14 h-8 rounded-none text-center text-sm")}
        />
      </PopoverTrigger>
      <PopoverContent className="flex gap-4 w-max p-2" side="bottom">
        <Button variant="destructive" onClick={strike}>
          <Minus />
        </Button>
        <Button onClick={check}>
          <Check />
        </Button>
      </PopoverContent>
    </Popover>
  );
}
