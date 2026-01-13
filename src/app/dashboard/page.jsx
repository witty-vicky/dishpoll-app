"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useEffect, useMemo, useState } from "react";
import { BarChart3, ChefHat, Sparkles, Vote } from "lucide-react";
import { useRouter } from "next/navigation";
import { useApp } from "../providers/app-provider";
import VoteTab from "./vote-tab";
import ResultsTab from "./results-tab";

export default function DashboardPage() {
    const router = useRouter();
    const { currentUser, setCurrentUser, isHydrated, dishes, votesByUser } = useApp();
    const [activeTab, setActiveTab] = useState("vote");

    const displayUsername = currentUser?.username
        ? `${currentUser.username.charAt(0).toUpperCase()}${currentUser.username.slice(1)}`
        : "Guest";

    const myVotesCount = useMemo(() => {
        if (!currentUser) return 0;
        const myVotes = votesByUser?.[currentUser.id] ?? {};
        return Object.values(myVotes).filter(Boolean).length;
    }, [currentUser, votesByUser]);

    const voteProgress = Math.min(100, Math.max(0, (myVotesCount / 3) * 100));

    useEffect(() => {
        if (!isHydrated) return;
        if (!currentUser) {
            router.replace("/");
        }
    }, [currentUser, isHydrated, router]);

    function handleLogout() {
        setCurrentUser(null);
        router.push("/");
    }

    return (
        <div className="min-h-screen bg-muted/40">
            <div className="container mx-auto max-w-6xl px-4 py-10">
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-semibold tracking-tight">🍕DishPoll</h1>
                        <p className="text-sm text-muted-foreground">
                            Rank your top dishes and see what the crowd loves.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="text-sm">
                            <div className="text-muted-foreground">Signed in as</div>
                            <div className="font-medium leading-tight">
                                {displayUsername}
                            </div>
                        </div>
                        <Button variant="secondary" onClick={handleLogout}>
                            Logout
                        </Button>
                    </div>
                </div>

                <div className="mb-8 overflow-hidden rounded-2xl border bg-gradient-to-br from-amber-500/15 via-background to-rose-500/20">
                    <div className="relative p-6 sm:p-8">
                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_circle_at_18%_0%,rgba(245,158,11,0.28),transparent_55%),radial-gradient(900px_circle_at_92%_28%,rgba(244,63,94,0.22),transparent_48%),radial-gradient(800px_circle_at_55%_110%,rgba(249,115,22,0.16),transparent_55%)]" />

                        <div className="relative grid gap-6 lg:grid-cols-[1.35fr_1fr] lg:items-end">
                            <div className="space-y-3">
                                <div className="inline-flex w-fit items-center gap-2 rounded-full border bg-background/70 px-3 py-1 text-xs text-muted-foreground">
                                    <Sparkles className="size-4" />
                                    Today’s picks
                                </div>

                                <div className="text-2xl font-semibold tracking-tight sm:text-3xl">
                                    Welcome, {displayUsername}
                                </div>

                                <div className="text-sm text-muted-foreground sm:text-base">
                                    Rank your top 3 dishes and see how they stack up. Your Rank 1 gets 30 points, Rank 2 gets 20, Rank 3 gets 10.
                                </div>

                                <div className="flex flex-wrap gap-2 pt-1">
                                    <Button className="h-11" onClick={() => setActiveTab("vote")}>
                                        <Vote />
                                        Start voting
                                    </Button>
                                    <Button
                                        className="h-11"
                                        variant="secondary"
                                        onClick={() => setActiveTab("results")}
                                    >
                                        <BarChart3 />
                                        View results
                                    </Button>
                                </div>
                            </div>

                            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                                <div className="rounded-2xl border bg-background/70 p-4">
                                    <div className="flex items-center justify-between gap-3">
                                        <div>
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                <ChefHat className="size-4" />
                                                Dishes available
                                            </div>
                                            <div className="mt-1 text-2xl font-semibold leading-tight">
                                                {dishes?.length ?? 0}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-2xl border bg-background/70 p-4">
                                    <div className="flex items-center justify-between gap-3">
                                        <div>
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                <Vote className="size-4" />
                                                Your votes
                                            </div>
                                            <div className="mt-1 text-2xl font-semibold leading-tight">{myVotesCount}/3</div>
                                        </div>
                                        <div className="text-right text-xs text-muted-foreground">
                                            {myVotesCount === 3 ? "Completed" : "In progress"}
                                        </div>
                                    </div>

                                    <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-muted">
                                        <div
                                            className="h-full rounded-full bg-primary transition-[width]"
                                            style={{ width: `${voteProgress}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsContent value="vote" className="mt-0">
                        <VoteTab />
                    </TabsContent>

                    <TabsContent value="results" className="mt-0">
                        <ResultsTab />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
