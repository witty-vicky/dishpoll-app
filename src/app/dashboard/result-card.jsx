"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Crown, Flame, Medal } from "lucide-react";
import Image from "next/image";

const USER_RANK_LABELS = {
    rank1: "Your Rank 1",
    rank2: "Your Rank 2",
    rank3: "Your Rank 3",
};

export default function ResultCard({ dish, rank, currentUserVotes }) {
    const userRank = Object.entries(currentUserVotes ?? {}).find(
        ([_, dishId]) => dishId === dish.id
    )?.[0];

    const rankMeta =
        rank === 1
            ? {
                icon: Crown,
                className: "bg-amber-500/15 text-amber-700 border-amber-500/30 dark:text-amber-300",
                label: "#1",
            }
            : rank === 2
                ? {
                    icon: Medal,
                    className: "bg-slate-500/15 text-slate-700 border-slate-500/30 dark:text-slate-200",
                    label: "#2",
                }
                : rank === 3
                    ? {
                        icon: Award,
                        className: "bg-orange-700/15 text-orange-800 border-orange-700/30 dark:text-orange-200",
                        label: "#3",
                    }
                    : {
                        icon: Award,
                        className: "bg-muted text-foreground border-border/60",
                        label: `#${rank}`,
                    };

    const RankIcon = rankMeta.icon;

    return (
        <Card>
            <CardContent className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center">
                <div className="flex items-center gap-3">
                    <div
                        className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 ${rankMeta.className}`}
                    >
                        <RankIcon className="size-4" />
                        <span className="font-semibold">{rankMeta.label}</span>
                    </div>

                    <Image
                        src={dish.image}
                        alt={dish.dishName}
                        width={100}
                        height={100}
                        className="h-14 w-14 rounded-lg object-cover ring-1 ring-black/5"
                    />
                </div>

                <div className="flex-1">
                    <div className="flex flex-col gap-1">
                        <h3 className="text-base font-semibold leading-tight">{dish.dishName}</h3>
                        <div className="flex flex-wrap items-center gap-2">
                            <div className="inline-flex items-center gap-1.5 rounded-full border bg-background/70 px-3 py-1 text-xs text-muted-foreground">
                                <Flame className="size-4" />
                                <span className="font-medium text-foreground">{dish.points}</span>
                                points
                            </div>

                            {userRank && (
                                <Badge variant="secondary" className="rounded-full">
                                    {USER_RANK_LABELS[userRank]}
                                </Badge>
                            )}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
