
"use client";

import type { Badge as BadgeType } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Award, Ship, UserCheck, Sparkles, Users, Trophy, Star, ShieldCheck,Zap } from "lucide-react"; // Added more icons

// Helper to get Lucide icon component by name
const getIconComponent = (iconName: string) => {
  const icons: { [key: string]: React.ElementType } = {
    Award, Ship, UserCheck, Sparkles, Users, Trophy, Star, ShieldCheck, Zap,
    Default: Award // Fallback icon
  };
  return icons[iconName] || icons.Default;
};

interface BadgesDisplayProps {
  badges: BadgeType[];
}

export function BadgesDisplay({ badges }: BadgesDisplayProps) {
  if (!badges || badges.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>My Badges</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No badges earned yet. Keep learning and teaching!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg border-t-4 border-yellow-500">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center">
          <Trophy className="mr-3 h-7 w-7 text-yellow-500" />
          My Badges & Achievements
        </CardTitle>
        <CardDescription>Showcasing your milestones on SkillSync & PeerUp.</CardDescription>
      </CardHeader>
      <CardContent>
        <TooltipProvider>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {badges.map((badge) => {
              const IconComponent = getIconComponent(badge.iconName);
              return (
                <Tooltip key={badge.id}>
                  <TooltipTrigger asChild>
                    <div className="flex flex-col items-center p-3 border rounded-lg bg-secondary/20 hover:shadow-md transition-shadow cursor-pointer">
                      <IconComponent className="h-12 w-12 text-primary mb-2" />
                      <p className="text-sm font-medium text-center truncate w-full">{badge.name}</p>
                      <p className="text-xs text-muted-foreground">Earned: {new Date(badge.dateEarned).toLocaleDateString()}</p>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p className="font-semibold">{badge.name}</p>
                    <p className="text-sm text-muted-foreground">{badge.description}</p>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        </TooltipProvider>
      </CardContent>
    </Card>
  );
}
