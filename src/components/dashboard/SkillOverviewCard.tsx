
"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, BookUser, Edit3, BookOpen } from "lucide-react";

interface Skill {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced';
}

interface SkillOverviewCardProps {
  skillsToTeach: Skill[];
  skillsToLearn: Skill[];
}

const getLevelColor = (level: string) => {
  switch(level) {
    case 'beginner': return 'text-green-500';
    case 'intermediate': return 'text-blue-500';
    case 'advanced': return 'text-purple-500';
    default: return 'text-gray-500';
  }
};

export function SkillOverviewCard({ skillsToTeach, skillsToLearn }: SkillOverviewCardProps) {
  return (
    <Card className="shadow-lg border border-border/50 overflow-hidden">
      <div className="absolute h-1 bg-gradient-to-r from-primary via-secondary to-accent w-full top-0"></div>
      <CardHeader>
        <CardTitle className="flex items-center text-2xl">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
            <BookUser className="h-6 w-6 text-primary" />
          </div>
          My Skills Portfolio
        </CardTitle>
        <CardDescription>An overview of the skills you can teach and want to learn.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-card rounded-lg p-4 border border-border/30 animate-fade-in">
          <h3 className="text-lg font-semibold mb-3 flex items-center">
            <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center mr-2">
              <BookOpen className="h-4 w-4 text-primary" />
            </div>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Skills I Can Teach</span>
          </h3>
          {skillsToTeach.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {skillsToTeach.map(skill => (
                <Badge 
                  key={skill.id} 
                  variant="secondary" 
                  className="text-sm px-3 py-1 bg-primary/5 hover:bg-primary/10 transition-colors border-primary/20 rounded-full"
                >
                  {skill.name} <span className={`ml-1 text-xs font-normal ${getLevelColor(skill.level)}`}>({skill.level})</span>
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground italic">You haven't added any skills to teach yet.</p>
          )}
        </div>
        <div className="bg-card rounded-lg p-4 border border-border/30 animate-fade-in" style={{animationDelay: '0.1s'}}>
          <h3 className="text-lg font-semibold mb-3 flex items-center">
            <div className="h-6 w-6 rounded-full bg-secondary/20 flex items-center justify-center mr-2">
              <Lightbulb className="h-4 w-4 text-secondary" />
            </div>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary to-accent">Skills I Want to Learn</span>
          </h3>
          {skillsToLearn.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {skillsToLearn.map(skill => (
                <Badge 
                  key={skill.id} 
                  variant="outline" 
                  className="text-sm px-3 py-1 bg-secondary/5 hover:bg-secondary/10 transition-colors border-secondary/20 rounded-full"
                >
                  {skill.name} <span className={`ml-1 text-xs font-normal ${getLevelColor(skill.level)}`}>({skill.level})</span>
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground italic">You haven't added any skills to learn yet.</p>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Link href="/profile/skills" passHref>
          <Button className="bg-gradient-to-r from-primary/80 to-secondary/80 hover:from-primary hover:to-secondary text-white shadow-md hover:shadow-lg transition-all duration-300">
            <Edit3 className="mr-2 h-4 w-4" />
            Edit My Skills
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
