
"use client"; // Convert to client component

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { mockLeaderboard } from "@/lib/mock-data";
import { Award, Trophy, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext"; // Import useAuth

const getInitials = (name: string) => {
  if (!name) return "U";
  const names = name.split(' ');
  if (names.length === 1) return names[0][0].toUpperCase();
  return names[0][0].toUpperCase() + names[names.length - 1][0].toUpperCase();
};

export default function LeaderboardPage() {
  const { currentUserProfile, loading: authLoading } = useAuth();
  const leaderboardData = mockLeaderboard; // For now, leaderboard data remains mock

  if (authLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 text-lg text-muted-foreground">Loading leaderboard...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="text-center">
        <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
        <h1 className="text-4xl font-bold">SahaAcharya Champions</h1>
        <p className="text-muted-foreground text-lg mt-2">
          See who's leading the pack in skill sharing and learning!
        </p>
      </div>
      
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="mr-2 h-6 w-6 text-accent" />
            Top Learners & Sharers
          </CardTitle>
          <CardDescription>Rankings are based on participation, skills taught, and skills learned.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Rank</TableHead>
                <TableHead>User</TableHead>
                <TableHead className="text-right">Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaderboardData.map((entry) => (
                <TableRow key={entry.userId} className={currentUserProfile && entry.userId === currentUserProfile.id ? "bg-primary/10" : ""}>
                  <TableCell className="font-medium text-lg">
                    {entry.rank === 1 && <Trophy className="h-5 w-5 inline-block mr-1 text-yellow-500" />}
                    {entry.rank === 2 && <Trophy className="h-5 w-5 inline-block mr-1 text-gray-400" />}
                    {entry.rank === 3 && <Trophy className="h-5 w-5 inline-block mr-1 text-orange-400" />}
                    {entry.rank}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border">
                        <AvatarImage src={entry.avatarUrl} alt={entry.name} data-ai-hint="user avatar" />
                        <AvatarFallback>{getInitials(entry.name)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{entry.name} {currentUserProfile && entry.userId === currentUserProfile.id && "(You)"}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-semibold text-primary">{entry.score.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
