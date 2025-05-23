
"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, BookUser, Edit3 } from "lucide-react";

interface SkillOverviewCardProps {
  skillsToTeach: string[];
  skillsToLearn: string[];
}

export function SkillOverviewCard({ skillsToTeach, skillsToLearn }: SkillOverviewCardProps) {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl">
          <BookUser className="mr-3 h-7 w-7 text-primary" />
          My Skills Portfolio
        </CardTitle>
        <CardDescription>An overview of the skills you can teach and want to learn.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <Lightbulb className="mr-2 h-5 w-5 text-green-500" />
            Skills I Can Teach
          </h3>
          {skillsToTeach.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {skillsToTeach.map(skill => (
                <Badge key={skill} variant="secondary" className="text-sm px-3 py-1 bg-green-100 text-green-700 border-green-300">
                  {skill}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">You haven't added any skills to teach yet.</p>
          )}
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <Lightbulb className="mr-2 h-5 w-5 text-blue-500" />
            Skills I Want to Learn
          </h3>
          {skillsToLearn.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {skillsToLearn.map(skill => (
                <Badge key={skill} variant="outline" className="text-sm px-3 py-1 bg-blue-100 text-blue-700 border-blue-300">
                  {skill}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">You haven't added any skills to learn yet.</p>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Link href="/profile" passHref>
          <Button>
            <Edit3 className="mr-2 h-4 w-4" />
            Edit My Skills
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
