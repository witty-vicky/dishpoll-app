"use client";

import { useApp } from "../providers/app-provider";
import ResultCard from "./result-card";

const RANK_POINTS = {
    rank1: 30,
    rank2: 20,
    rank3: 10,
};

export default function ResultsTab() {
    const { dishes, votesByUser, currentUser } = useApp();

    const currentUserVotes = currentUser ? votesByUser[currentUser.id] : null;
    const hasAnyVote = currentUserVotes
        ? Object.values(currentUserVotes).some(Boolean)
        : false;

    // Calculate total points per dish
    const results = dishes.map((dish) => {
        let points = 0;

        Object.values(votesByUser).forEach((userVotes) => {
            Object.entries(userVotes).forEach(([rank, dishId]) => {
                if (dishId === dish.id) {
                    points += RANK_POINTS[rank] ?? 0;
                }
            });
        });

        return { ...dish, points };
    });

    // Sort descending by points
    const sortedResults = [...results].sort(
        (a, b) => b.points - a.points
    );

    const topThree = sortedResults.slice(0, 3);
    const rest = sortedResults.slice(3);

    if (!hasAnyVote) {
        return (
            <div className="rounded-2xl border bg-muted/30 p-6 text-center">
                <div className="text-lg font-semibold">You haven’t picked any dish yet</div>
                <div className="mt-1 text-sm text-muted-foreground">
                    Please select your favourite dishes first to see the leaderboard.
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {topThree.length > 0 && (
                <div className="rounded-2xl border bg-muted/30 p-4 sm:p-6">
                    <div className="mb-4 text-sm font-medium text-muted-foreground">Top picks</div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:items-end">
                        {[1, 0, 2].map((pos) => {
                            const dish = topThree[pos];
                            if (!dish) return null;

                            const rank = pos + 1;
                            const lift = rank === 1 ? "md:-translate-y-3" : rank === 3 ? "md:-translate-y-1" : "";

                            return (
                                <div key={dish.id} className={lift}>
                                    <ResultCard
                                        dish={dish}
                                        rank={rank}
                                        currentUserVotes={currentUserVotes}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {rest.length > 0 && (
                <div>
                    <div className="mb-4 text-sm font-medium text-muted-foreground">More results</div>
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                        {rest.map((dish, idx) => (
                            <ResultCard
                                key={dish.id}
                                dish={dish}
                                rank={idx + 4}
                                currentUserVotes={currentUserVotes}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
