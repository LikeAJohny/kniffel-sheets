import { Sheet } from "@/components/base-game/sheet";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { pb } from "@/lib/pocketbase";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/play")({
  component: RouteComponent,
  loader: () => {
    if (!pb.authStore.isValid) {
      throw redirect({ to: "/login" });
    }
  },
});

function RouteComponent() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <Card>
        <CardHeader>
          <CardTitle>Spielername</CardTitle>
          <CardDescription>19.04.2025 07:30</CardDescription>
        </CardHeader>
        <CardContent>
          <Sheet />
        </CardContent>
      </Card>
    </div>
  );
}
