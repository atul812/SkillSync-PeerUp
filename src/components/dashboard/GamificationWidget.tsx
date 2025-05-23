
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Flame, Coins, Award } from "lucide-react";

interface GamificationWidgetProps {
  tokens: number;
  streak: number;
  rank?: number; // Optional: if pulling from leaderboard
}

export function GamificationWidget({ tokens, streak, rank }: GamificationWidgetProps) {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl">
          <Award className="mr-3 h-7 w-7 text-accent" />
          My Achievements
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col items-center p-4 bg-secondary/50 rounded-lg">
          <Flame className="h-12 w-12 text-orange-500 mb-2" />
          <p className="text-3xl font-bold">{streak}</p>
          <p className="text-muted-foreground">Day Streak</p>
        </div>
        <div className="flex flex-col items-center p-4 bg-secondary/50 rounded-lg">
          <Coins className="h-12 w-12 text-yellow-500 mb-2" />
          <p className="text-3xl font-bold">{tokens}</p>
          <p className="text-muted-foreground">Tokens Earned</p>
        </div>
        {rank && (
           <div className="flex flex-col items-center p-4 bg-secondary/50 rounded-lg md:col-span-2">
            <Award className="h-12 w-12 text-primary mb-2" />
            <p className="text-3xl font-bold">#{rank}</p>
            <p className="text-muted-foreground">Leaderboard Rank</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
