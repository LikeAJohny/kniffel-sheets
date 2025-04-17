import { Sheet } from "@/components/base-game/sheet";
import { Input } from "@/components/ui/input";
import { createFileRoute } from "@tanstack/react-router";
import { useState, type ChangeEvent } from "react";

export const Route = createFileRoute("/game")({
  component: RouteComponent,
});

function RouteComponent() {
  const [games, setGames] = useState("1");

  return (
    <div className="p-4 w-max">
      <Input
        value={games}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setGames(e.target.value)
        }
      />

      <Sheet games={parseInt(games) || 1} />
    </div>
  );
}
