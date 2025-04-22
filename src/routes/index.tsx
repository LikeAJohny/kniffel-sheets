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
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

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
  const sheet = useSheet();

  const handleStart = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const count = Number(formData.get("games"));

    sheet.start(count);
    navigate({ to: "/play" });
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
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
                    <Input
                      id="games"
                      name="games"
                      placeholder="Number Of Games"
                    />
                    <Button type="submit">Start</Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
