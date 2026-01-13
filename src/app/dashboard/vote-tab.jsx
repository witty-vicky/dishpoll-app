"use client";

import { useApp } from "../providers/app-provider";
import DishCard from "./dish-card";

export default function VoteTab() {
    const { dishes } = useApp();

    if (!dishes.length) {
        return <p className="text-muted-foreground">Loading dishes...</p>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {dishes.map((dish) => (
                <DishCard key={dish.id} dish={dish} />
            ))}
        </div>
    );
}
