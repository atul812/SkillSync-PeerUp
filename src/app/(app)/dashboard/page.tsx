
"use client"; // Convert to client component

import { SkillOverviewCard } from "@/components/dashboard/SkillOverviewCard";
import { GamificationWidget } from "@/components/dashboard/GamificationWidget";
import { RecommendationsDisplay } from "@/components/dashboard/RecommendationsDisplay";
import { LearningRoadmapPreview } from "@/components/dashboard/LearningRoadmapPreview";
import { IllustratedFeatures } from "@/components/dashboard/IllustratedFeatures";
import { mockLearningRoadmap, mockLeaderboard } from "@/lib/mock-data"; // Keep mockLeaderboard for rank calculation
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Zap, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext"; // Import useAuth
import { useEffect, useState } from "react";
import type { UserProfile as UserProfileType } from "@/types"; // Import UserProfile type

// Helper function to convert string arrays to Skill objects
interface Skill {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced';
}

const convertToSkillObjects = (skillStrings: string[]): Skill[] => {
  return skillStrings.map((skill, index) => ({
    id: `skill-${index}`,
    name: skill,
    // Randomly assign a level for demonstration purposes
    level: ['beginner', 'intermediate', 'advanced'][Math.floor(Math.random() * 3)] as 'beginner' | 'intermediate' | 'advanced'
  }));
}

export default function DashboardPage() {
  const { currentUserProfile, loading: authLoading } = useAuth();
  // Local state to hold user profile for display to avoid issues with initial null/loading state
  const [displayProfile, setDisplayProfile] = useState<UserProfileType | null>(null);
  
  useEffect(() => {
    if (currentUserProfile) {
      setDisplayProfile(currentUserProfile);
    }
  }, [currentUserProfile]);

  // In a real app, learningRoadmap would likely be fetched or be user-specific.
  const learningRoadmap = mockLearningRoadmap; 
  
  // Calculate userRank based on displayProfile if available
  const userRank = displayProfile ? mockLeaderboard.find(entry => entry.userId === displayProfile.id)?.rank : undefined;

  if (authLoading || !displayProfile) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 text-lg text-muted-foreground">Loading dashboard...</p>
      </div>
    );
  }
  
  // Now we are sure displayProfile is not null
  const userProfile = displayProfile;

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
          skillsToTeach={convertToSkillObjects(userProfile.skillsToTeach)}
          skillsToLearn={convertToSkillObjects(userProfile.skillsToLearn)}
        />
        <GamificationWidget 
          tokens={userProfile.tokens}
          streak={userProfile.streak}
          rank={userRank} // Pass calculated rank
        />
        <LearningRoadmapPreview roadmap={learningRoadmap} />
      </div>

      <Card className="shadow-lg border-t-2 border-t-primary/30">
        <CardHeader>
          <CardTitle className="text-2xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Explore SkillSync Features
          </CardTitle>
          <CardDescription>
            Discover all the ways SkillSync can help you connect, learn, and grow
          </CardDescription>
        </CardHeader>
        <CardContent>
          <IllustratedFeatures />
        </CardContent>
      </Card>

      <div>
        {/* RecommendationsDisplay already expects currentUserProfile from props and handles its own loading/state */}
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
