
// This page should ideally be a server component, fetching initial data.
// For client components like RecommendationsDisplay, they will handle their own client-side fetching.
import { SkillOverviewCard } from "@/components/dashboard/SkillOverviewCard";
import { GamificationWidget } from "@/components/dashboard/GamificationWidget";
import { RecommendationsDisplay } from "@/components/dashboard/RecommendationsDisplay";
import { LearningRoadmapPreview } from "@/components/dashboard/LearningRoadmapPreview";
import { mockUserProfile, mockLearningRoadmap, mockLeaderboard } from "@/lib/mock-data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Zap } from "lucide-react";

export default async function DashboardPage() {
  // In a real app, this data would be fetched from a database or API based on the logged-in user.
  const userProfile = mockUserProfile;
  const learningRoadmap = mockLearningRoadmap;
  const userRank = mockLeaderboard.find(entry => entry.userId === userProfile.id)?.rank;

  return (
    <div className="space-y-8">
      <Card className="bg-gradient-to-r from-primary to-blue-500 text-primary-foreground shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl">Welcome back, {userProfile.name}!</CardTitle>
          <CardDescription className="text-primary-foreground/80 text-lg">
            Ready to swap some skills and learn something new today?
          </CardDescription>
        </CardHeader>
        <CardContent>
           <Link href="/profile" passHref>
            <Button variant="secondary" size="lg">
                <Zap className="mr-2 h-5 w-5"/>
                Update Your Profile & Get Matches
            </Button>
           </Link>
        </CardContent>
      </Card>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <SkillOverviewCard 
          skillsToTeach={userProfile.skillsToTeach}
          skillsToLearn={userProfile.skillsToLearn}
        />
        <GamificationWidget 
          tokens={userProfile.tokens}
          streak={userProfile.streak}
          rank={userRank}
        />
        <LearningRoadmapPreview roadmap={learningRoadmap} />
      </div>

      <div>
        <RecommendationsDisplay currentUserProfile={userProfile} />
      </div>

      {/* Placeholder for quick actions or announcements */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Links</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-4">
          <Link href="/matches" passHref><Button variant="outline">Find New Matches</Button></Link>
          <Link href="/roadmap" passHref><Button variant="outline">View My Roadmap</Button></Link>
          <Link href="/leaderboard" passHref><Button variant="outline">Check Leaderboard</Button></Link>
        </CardContent>
      </Card>
    </div>
  );
}
