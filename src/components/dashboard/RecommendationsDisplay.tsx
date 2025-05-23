
"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, UserCheck, RefreshCw, Zap, Send, GitFork } from "lucide-react"; // Added GitFork for swap
import type { AISkillMatchInput, AISkillMatchOutput, UserProfile, SkillMatch } from '@/types';
import { recommendSkillMatches as recommendSkillMatchesFlow } from '@/ai/flows/skill-match-recommendation';
import { Badge } from '@/components/ui/badge';
import { mockSkillMatches } from '@/lib/mock-data';
import { useToast } from "@/hooks/use-toast"; // Import useToast

interface RecommendationsDisplayProps {
  currentUserProfile: UserProfile;
}

const getInitials = (name: string) => {
  if (!name) return "U";
  const names = name.split(' ');
  if (names.length === 1) return names[0][0].toUpperCase();
  return (names[0][0].toUpperCase() + (names[names.length - 1]?.[0]?.toUpperCase() || "")).slice(0,2);
};

export function RecommendationsDisplay({ currentUserProfile }: RecommendationsDisplayProps) {
  const [recommendations, setRecommendations] = useState<SkillMatch[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast(); // Initialize useToast

  const fetchRecommendations = async () => {
    if (!currentUserProfile.skillsToLearn.length && !currentUserProfile.skillsToTeach.length) {
      setError("Please update your profile with skills to teach and learn to get recommendations.");
      setRecommendations([]);
      return;
    }

    setIsLoading(true);
    setError(null); // Clear previous errors before fetching

    const input: AISkillMatchInput = {
      teachingSkills: currentUserProfile.skillsToTeach,
      learningSkills: currentUserProfile.skillsToLearn,
      studentProfile: currentUserProfile.bio,
    };

    try {
      const result: AISkillMatchOutput = await recommendSkillMatchesFlow(input);
      
      if (result.recommendedMatches && result.recommendedMatches.length > 0) {
        const formattedMatches: SkillMatch[] = result.recommendedMatches.map((name, index) => {
          // Prioritize actual skills from profile for a more logical mock
          const skillsTheyTeachYou = currentUserProfile.skillsToLearn.length > 0 
            ? [...currentUserProfile.skillsToLearn].sort(() => 0.5 - Math.random()).slice(0, Math.min(2, currentUserProfile.skillsToLearn.length))
            : ["Relevant Skill A", "Relevant Skill B"]; // Fallback if user has no skillsToLearn

          const skillsYouTeachThem = currentUserProfile.skillsToTeach.length > 0
            ? [...currentUserProfile.skillsToTeach].sort(() => 0.5 - Math.random()).slice(0, Math.min(2, currentUserProfile.skillsToTeach.length))
            : ["Your Skill X", "Your Skill Y"]; // Fallback if user has no skillsToTeach
            
          return {
            userId: `ai_match_${index}_${Date.now()}`,
            name: name,
            avatarUrl: `https://placehold.co/80x80.png?text=${getInitials(name)}`,
            commonSkillsToTeach: skillsTheyTeachYou,
            commonSkillsToLearn: skillsYouTeachThem,
            reasoning: index === 0 && result.reasoning ? result.reasoning : `This user has skills that complement yours. ${name} can teach you ${skillsTheyTeachYou.join(', ') || 'some interesting skills'}, and you could teach them ${skillsYouTeachThem.join(', ') || 'some of your skills'}.`
          };
        });
        setRecommendations(formattedMatches);
        setError(null); // Clear any previous "add skills" error if matches are found
      } else {
        // AI returned no specific matches, show mockSkillMatches without specific error message
        setRecommendations(mockSkillMatches);
        setError(null); // No error message, just show mock data
      }
    } catch (e) {
      console.error("Failed to fetch recommendations:", e);
      // Actual error during AI call, show mockSkillMatches without specific error message
      setRecommendations(mockSkillMatches);
      setError(null); // No error message, just show mock data
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (currentUserProfile && (currentUserProfile.skillsToLearn.length > 0 || currentUserProfile.skillsToTeach.length > 0)) {
      fetchRecommendations();
    } else if (currentUserProfile) { // Added currentUserProfile check here
       setError("Add skills to your profile to discover potential matches!");
       setRecommendations([]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUserProfile?.id, currentUserProfile?.skillsToTeach.join(','), currentUserProfile?.skillsToLearn.join(','), currentUserProfile?.bio]);


  const handleConnect = (matchName: string) => {
    toast({
      title: "Connection Requested",
      description: `Your request to connect with ${matchName} has been sent (mock).`,
    });
  };

  const handleRequestSwap = (match: SkillMatch) => {
    let description = `Skill swap requested with ${match.name} (mock).`;
    if (match.commonSkillsToLearn.length > 0 && match.commonSkillsToTeach.length > 0) {
      description = `Skill swap requested with ${match.name}: offering to teach ${match.commonSkillsToLearn[0]} for their ${match.commonSkillsToTeach[0]} (mock).`;
    } else if (match.commonSkillsToLearn.length > 0) {
      description = `Skill swap requested with ${match.name}: offering to teach ${match.commonSkillsToLearn[0]} (mock).`;
    } else if (match.commonSkillsToTeach.length > 0) {
      description = `Skill swap requested with ${match.name}: interested in learning ${match.commonSkillsToTeach[0]} (mock).`;
    }
    toast({
      title: "Swap Requested",
      description: description,
    });
  };

  // Ensure currentUserProfile exists before trying to access its properties
  if (!currentUserProfile) {
    return (
        <Card className="shadow-lg">
            <CardHeader>
                 <CardTitle className="flex items-center text-2xl">
                    <UserCheck className="mr-3 h-7 w-7 text-primary" />
                    Skill Match Recommendations
                </CardTitle>
                <CardDescription>AI-powered suggestions for peer learning.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex justify-center items-center h-40">
                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                     <p className="ml-4 text-muted-foreground">Loading user profile...</p>
                </div>
            </CardContent>
        </Card>
    );
  }

  return (
    <Card className="shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center text-2xl">
            <UserCheck className="mr-3 h-7 w-7 text-primary" />
            Skill Match Recommendations
          </CardTitle>
          <CardDescription>AI-powered suggestions for peer learning.</CardDescription>
        </div>
        <Button onClick={fetchRecommendations} disabled={isLoading} size="sm" variant="outline">
          <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </CardHeader>
      <CardContent>
        {error && (currentUserProfile.skillsToLearn.length === 0 && currentUserProfile.skillsToTeach.length === 0) && (
          <Alert variant="default" className="mb-4 bg-yellow-50 border-yellow-300 text-yellow-700">
            <Zap className="h-4 w-4 !text-yellow-700" />
            <AlertTitle>Tip!</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="ml-4 text-muted-foreground">Finding your perfect matches...</p>
          </div>
        ) : recommendations.length > 0 ? (
          <div className="space-y-6">
            {recommendations.map((match) => (
              <Card key={match.userId} className="bg-background/70 hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-start gap-4">
                  <Avatar className="h-16 w-16 border-2 border-primary">
                    <AvatarImage src={match.avatarUrl} alt={match.name} data-ai-hint="student avatar" />
                    <AvatarFallback>{getInitials(match.name)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="text-xl">{match.name}</CardTitle>
                    <CardDescription className="mt-1 text-sm">{match.reasoning}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-1">Can Teach You:</h4>
                    <div className="flex flex-wrap gap-2">
                      {match.commonSkillsToTeach.map(skill => <Badge key={skill} variant="secondary" className="bg-green-100 text-green-700 border-green-300">{skill}</Badge>)}
                      {match.commonSkillsToTeach.length === 0 && <p className="text-xs text-muted-foreground">This user might have other skills you'd find useful!</p>}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-1">Can Learn From You:</h4>
                     <div className="flex flex-wrap gap-2">
                      {match.commonSkillsToLearn.map(skill => <Badge key={skill} variant="outline" className="bg-blue-100 text-blue-700 border-blue-300">{skill}</Badge>)}
                      {match.commonSkillsToLearn.length === 0 && <p className="text-xs text-muted-foreground">You might have skills this user could learn!</p>}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="gap-2">
                  <Button variant="default" size="sm" onClick={() => handleConnect(match.name)}>
                    <Send className="mr-2 h-4 w-4" /> Connect
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleRequestSwap(match)}>
                    <GitFork className="mr-2 h-4 w-4" />
                    Request Swap
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          !isLoading && !(currentUserProfile.skillsToLearn.length === 0 && currentUserProfile.skillsToTeach.length === 0) && <p className="text-muted-foreground text-center py-8">No specific recommendations found. Try adjusting your skills or check back later!</p>
        )}
         {/* Fallback message if no skills are set and no error message already exists from the profile check */}
        {!isLoading && recommendations.length === 0 && (currentUserProfile.skillsToLearn.length === 0 && currentUserProfile.skillsToTeach.length === 0 && !error) && (
             <p className="text-muted-foreground text-center py-8">Add skills to your profile to get recommendations.</p>
        )}
      </CardContent>
    </Card>
  );
}
