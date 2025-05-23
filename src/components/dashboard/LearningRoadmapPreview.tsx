
"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import type { LearningRoadmap as LearningRoadmapType } from "@/types"; // Renamed to avoid conflict
import { BookOpen, CheckCircle, ArrowRight } from "lucide-react";

interface LearningRoadmapPreviewProps {
  roadmap: LearningRoadmapType;
}

export function LearningRoadmapPreview({ roadmap }: LearningRoadmapPreviewProps) {
  const completedSteps = roadmap.steps.filter(step => step.isCompleted).length;
  const totalSteps = roadmap.steps.length;
  const progressPercentage = totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0;

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl">
          <BookOpen className="mr-3 h-7 w-7 text-primary" />
          {roadmap.title}
        </CardTitle>
        <CardDescription>{roadmap.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between text-sm text-muted-foreground mb-1">
            <span>Progress</span>
            <span>{completedSteps} / {totalSteps} Steps</span>
          </div>
          <Progress value={progressPercentage} aria-label={`${roadmap.title} progress`} className="h-3"/>
        </div>
        <div className="space-y-2">
          <h4 className="font-semibold">Next Steps:</h4>
          {roadmap.steps.filter(step => !step.isCompleted).slice(0, 2).map(step => (
            <div key={step.id} className="flex items-center text-sm p-2 bg-secondary/30 rounded-md">
              <CheckCircle className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>{step.title}</span>
            </div>
          ))}
          {roadmap.steps.filter(step => !step.isCompleted).length === 0 && (
            <p className="text-sm text-green-600 flex items-center">
              <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
              All steps completed! Well done!
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Link href="/roadmap" passHref>
          <Button variant="outline">
            View Full Roadmap <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
