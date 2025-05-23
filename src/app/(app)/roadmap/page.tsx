
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { mockLearningRoadmap } from "@/lib/mock-data";
import Link from "next/link";
import { BookOpen, CheckSquare, Square, ExternalLink, PlusCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label"; // Added import
import React from 'react'; // Keep React import for key prop

export default function RoadmapPage() {
  const roadmap = mockLearningRoadmap;

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
            <h1 className="text-3xl font-bold flex items-center">
                <BookOpen className="mr-3 h-8 w-8 text-primary"/>
                Learning Roadmap: {roadmap.title}
            </h1>
            <p className="text-muted-foreground mt-1">{roadmap.description}</p>
        </div>
        <Button variant="outline" disabled>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Roadmap
        </Button>
      </div>
      
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Roadmap Progress</CardTitle>
          <CardDescription>Track your journey through the {roadmap.title} roadmap.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {roadmap.steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <Card className={`p-4 ${step.isCompleted ? 'bg-green-50 border-green-200' : 'bg-secondary/30'}`}>
                <div className="flex items-start gap-4">
                  <Checkbox id={`step-${step.id}`} checked={step.isCompleted} className="mt-1 data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
                  <div className="flex-1">
                    <Label htmlFor={`step-${step.id}`} className={`text-lg font-semibold ${step.isCompleted ? 'line-through text-muted-foreground' : ''}`}>
                      {step.title}
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                    {step.resources && step.resources.length > 0 && (
                        <div className="mt-3">
                            <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-1">Resources:</h4>
                            <ul className="space-y-1">
                                {step.resources.map(resource => (
                                    <li key={resource.name}>
                                        <Link href={resource.url} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline flex items-center">
                                            {resource.name} <ExternalLink className="ml-1 h-3 w-3"/>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                  </div>
                  {step.isCompleted ? (
                    <CheckSquare className="h-6 w-6 text-green-500" />
                  ) : (
                    <Square className="h-6 w-6 text-muted-foreground" />
                  )}
                </div>
              </Card>
              {index < roadmap.steps.length - 1 && <Separator className="my-4"/>}
            </React.Fragment>
          ))}
        </CardContent>
        <CardFooter>
            <Button disabled>Mark All as Complete (Feature Coming Soon)</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
