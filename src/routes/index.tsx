import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useSheet } from "@/state/base-game.jotai";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import type { FormEvent } from "react";
import { pb } from "@/lib/pocketbase";

export const Route = createFileRoute("/")({
  component: App,
  loader: () => {
    if (!pb.authStore.isValid) {
      throw redirect({ to: "/login" });
    }
  },
});

function App() {
  const navigate = useNavigate();
  const { start } = useSheet();

  const handleStart = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const count = Number(formData.get("games"));

    start(count);
    navigate({ to: "/play" });
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Bla</CardTitle>
              <CardDescription>Bla</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleStart}>
                <Input id="games" name="games" placeholder="Number Of Games" />
                <Button type="submit">Start</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
