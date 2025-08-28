
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Coins, Flame, Trophy } from "lucide-react";

interface GamificationWidgetProps {
  tokens: number;
  streak: number;
  rank?: number; // Optional: if pulling from leaderboard
}

export function GamificationWidget({ tokens, streak, rank }: GamificationWidgetProps) {
  return (
    <Card className="shadow-lg border border-border/50 overflow-hidden">
      <div className="absolute h-1 bg-gradient-to-r from-accent via-primary to-secondary w-full top-0"></div>
      <CardHeader>
        <CardTitle className="flex items-center text-2xl">
          <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center mr-2">
            <Trophy className="h-4 w-4 text-accent" />
          </div>
          My Achievements
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col items-center p-4 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-xl border border-orange-500/20 shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in">
          <div className="h-12 w-12 rounded-full bg-orange-500/20 flex items-center justify-center mb-3">
            <Flame className="h-6 w-6 text-orange-500" />
          </div>
          <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-red-500">{streak}</p>
          <p className="text-muted-foreground">Day Streak</p>
        </div>
        <div className="flex flex-col items-center p-4 bg-gradient-to-br from-yellow-500/10 to-amber-500/10 rounded-xl border border-yellow-500/20 shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in" style={{animationDelay: '0.1s'}}>
          <div className="h-12 w-12 rounded-full bg-yellow-500/20 flex items-center justify-center mb-3">
            <Coins className="h-6 w-6 text-yellow-500" />
          </div>
          <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-amber-500">{tokens}</p>
          <p className="text-muted-foreground">Tokens Earned</p>
        </div>
        {rank && (
           <div className="flex flex-col items-center p-4 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 rounded-xl border border-purple-500/20 shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in md:col-span-2" style={{animationDelay: '0.2s'}}>
            <div className="h-12 w-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-3">
              <Award className="h-6 w-6 text-purple-500" />
            </div>
            <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-indigo-500">#{rank}</p>
            <p className="text-muted-foreground">Leaderboard Rank</p>
          </div>
        )}
        
        <div className="mt-4 p-4 bg-card rounded-xl border border-border/30 animate-fade-in md:col-span-2" style={{animationDelay: '0.3s'}}>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-sm">Next Achievement</h4>
              <p className="text-xs text-foreground/70 mt-1">Reach a 10-day streak to unlock special rewards!</p>
            </div>
            <div className="h-2 w-24 bg-background rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-accent" 
                style={{width: `${Math.min(streak * 10, 100)}%`}}
              ></div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
