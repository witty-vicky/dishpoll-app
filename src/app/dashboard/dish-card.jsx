"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, Crown, Medal, X } from "lucide-react";
import { toast } from "sonner";
import { useApp } from "../providers/app-provider";

const RANK_LABELS = {
    rank1: "Rank 1 (30 pts)",
    rank2: "Rank 2 (20 pts)",
    rank3: "Rank 3 (10 pts)",
};

export default function DishCard({ dish }) {
    const { currentUser, votesByUser, setVotesByUser } = useApp();

    const userVotes =
        currentUser && votesByUser[currentUser.id]
            ? votesByUser[currentUser.id]
            : {};
    const currentRank = Object.entries(userVotes).find(
        ([_, dId]) => dId === dish.id
    )?.[0] ?? "none";

    function handleRankChange(value) {
        const rank = value === "none" ? null : value;

        setVotesByUser((prev) => {
            const votes = prev[currentUser.id] ?? {
                rank1: null,
                rank2: null,
                rank3: null,
            };

            const updated = { ...votes };

            Object.keys(updated).forEach((r) => {
                if (updated[r] === dish.id) updated[r] = null;
            });

            if (rank) updated[rank] = dish.id;

            return { ...prev, [currentUser.id]: updated };
        });

        toast.success("Vote updated", {
            description: rank
                ? `${dish.dishName} set to ${RANK_LABELS[rank]}`
                : `${dish.dishName} removed from ranking`,
        });
    }

    return (
        <Card className="pt-0">
            <Image
                src={dish.image}
                alt={dish.dishName}
                width={100}
                height={100}
                className="h-48 w-full object-cover rounded-t-md"
            />

            <CardContent className="space-y-3">
                <div>
                    <h3 className="font-semibold">{dish.dishName}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                        {dish.description}
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        className={
                            currentRank === "rank1"
                                ? "bg-amber-500 text-white hover:bg-amber-500/90 border-amber-500/40"
                                : ""
                        }
                        onClick={() => handleRankChange("rank1")}
                        aria-label="Set Rank 1"
                        title="Rank 1 (30 pts)"
                    >
                        <Crown />
                        <span>Rank 1</span>
                        <span className="text-xs opacity-80">(30pts)</span>
                    </Button>

                    <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        className={
                            currentRank === "rank2"
                                ? "bg-slate-600 text-white hover:bg-slate-600/90 border-slate-500/40"
                                : ""
                        }
                        onClick={() => handleRankChange("rank2")}
                        aria-label="Set Rank 2"
                        title="Rank 2 (20 pts)"
                    >
                        <Medal />
                        <span>Rank 2</span>
                        <span className="text-xs opacity-80">(20pts)</span>
                    </Button>

                    <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        className={
                            currentRank === "rank3"
                                ? "bg-orange-700 text-white hover:bg-orange-700/90 border-orange-600/40"
                                : ""
                        }
                        onClick={() => handleRankChange("rank3")}
                        aria-label="Set Rank 3"
                        title="Rank 3 (10 pts)"
                    >
                        <Award />
                        <span>Rank 3</span>
                        <span className="text-xs opacity-80">(10pts)</span>
                    </Button>

                    <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        className={
                            currentRank === "none"
                                ? "opacity-0 pointer-events-none"
                                : "opacity-100"
                        }
                        onClick={() => handleRankChange("none")}
                        aria-label="Clear rank"
                        title="Clear rank"
                    >
                        <X />
                        <span>Clear</span>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
