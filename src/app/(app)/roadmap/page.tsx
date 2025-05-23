
"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { mockLearningRoadmap as initialMockRoadmap } from "@/lib/mock-data";
import Link from "next/link";
import { BookOpen, CheckSquare, Square, ExternalLink, PlusCircle, RefreshCcw, ListChecks, ListPlus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import type { LearningRoadmap as LearningRoadmapType, RoadmapStep } from '@/types';
import { useToast } from "@/hooks/use-toast";

export default function RoadmapPage() {
  const [roadmap, setRoadmap] = useState<LearningRoadmapType>(initialMockRoadmap);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [completedStepsCount, setCompletedStepsCount] = useState(0);
  const { toast } = useToast();

  // State for adding new steps
  const [newStepTitle, setNewStepTitle] = useState("");
  const [newStepDescription, setNewStepDescription] = useState("");
  const [newStepResourceUrl, setNewStepResourceUrl] = useState("");
  const [newStepResourceName, setNewStepResourceName] = useState("");


  useEffect(() => {
    const completed = roadmap.steps.filter(step => step.isCompleted).length;
    const total = roadmap.steps.length;
    setCompletedStepsCount(completed);
    setProgressPercentage(total > 0 ? (completed / total) * 100 : 0);
  }, [roadmap]);

  const handleStepToggle = (stepId: string) => {
    setRoadmap(prevRoadmap => {
      const newSteps = prevRoadmap.steps.map(step =>
        step.id === stepId ? { ...step, isCompleted: !step.isCompleted } : step
      );
      return { ...prevRoadmap, steps: newSteps };
    });
  };

  const handleResetRoadmap = () => {
    // Resets to the initial mock roadmap, discarding any user-added steps for this mock version
    setRoadmap(initialMockRoadmap);
    toast({
      title: "Roadmap Reset",
      description: `The "${initialMockRoadmap.title}" roadmap has been reset to its initial state.`,
    });
  };

  const handleMarkAllComplete = () => {
    setRoadmap(prevRoadmap => {
      const completedSteps = prevRoadmap.steps.map(step => ({ ...step, isCompleted: true }));
      return { ...prevRoadmap, steps: completedSteps };
    });
    toast({
      title: "All Steps Completed!",
      description: `All steps in the "${roadmap.title}" roadmap have been marked as complete.`,
      variant: "default",
    });
  };

  const handleAddNewStep = () => {
    if (!newStepTitle.trim()) {
      toast({
        title: "Error Adding Step",
        description: "Step title cannot be empty.",
        variant: "destructive",
      });
      return;
    }

    const newStep: RoadmapStep = {
      id: `custom-${Date.now().toString()}`, // Simple unique ID for mock
      title: newStepTitle.trim(),
      description: newStepDescription.trim(),
      resources: newStepResourceUrl.trim()
        ? [{ name: newStepResourceName.trim() || newStepResourceUrl.trim(), url: newStepResourceUrl.trim() }]
        : [],
      isCompleted: false,
    };

    setRoadmap(prevRoadmap => ({
      ...prevRoadmap,
      steps: [...prevRoadmap.steps, newStep],
    }));

    toast({
      title: "Step Added",
      description: `"${newStep.title}" has been added to your roadmap.`,
    });

    // Clear input fields
    setNewStepTitle("");
    setNewStepDescription("");
    setNewStepResourceUrl("");
    setNewStepResourceName("");
  };

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
        <Button variant="outline" onClick={handleResetRoadmap}>
            <RefreshCcw className="mr-2 h-4 w-4" />
            Reset Current Roadmap (Mock)
        </Button>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Roadmap Progress ({completedStepsCount}/{roadmap.steps.length})</CardTitle>
          <CardDescription>
            Track your journey through the {roadmap.title} roadmap.
            Current progress: {Math.round(progressPercentage)}%
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {roadmap.steps.length === 0 && (
            <p className="text-muted-foreground text-center py-4">No steps in this roadmap yet. Add some below!</p>
          )}
          {roadmap.steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <Card className={`p-4 ${step.isCompleted ? 'bg-green-50 border-green-200' : 'bg-secondary/30'}`}>
                <div className="flex items-start gap-4">
                  <Checkbox
                    id={`step-${step.id}`}
                    checked={step.isCompleted}
                    onCheckedChange={() => handleStepToggle(step.id)}
                    className="mt-1 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <div className="flex-1">
                    <Label
                      htmlFor={`step-${step.id}`}
                      className={`text-lg font-semibold cursor-pointer ${step.isCompleted ? 'line-through text-muted-foreground' : ''}`}
                    >
                      {step.title}
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                    {step.resources && step.resources.length > 0 && (
                        <div className="mt-3">
                            <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-1">Resources:</h4>
                            <ul className="space-y-1">
                                {step.resources.map(resource => (
                                    <li key={resource.name + resource.url}>
                                        <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline flex items-center">
                                            {resource.name} <ExternalLink className="ml-1 h-3 w-3"/>
                                        </a>
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
            <Button onClick={handleMarkAllComplete} disabled={roadmap.steps.length === 0}>
              <ListChecks className="mr-2 h-4 w-4" />
              Mark All as Complete
            </Button>
        </CardFooter>
      </Card>

      {/* Add New Step Card */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center">
            <ListPlus className="mr-2 h-6 w-6 text-accent" />
            Add Custom Step to Roadmap
          </CardTitle>
          <CardDescription>Personalize your learning journey by adding your own tasks and resources.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="newStepTitle">Step Title*</Label>
            <Input
              id="newStepTitle"
              value={newStepTitle}
              onChange={(e) => setNewStepTitle(e.target.value)}
              placeholder="e.g., Learn about React Hooks"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="newStepDescription">Step Description</Label>
            <Textarea
              id="newStepDescription"
              value={newStepDescription}
              onChange={(e) => setNewStepDescription(e.target.value)}
              placeholder="e.g., Focus on useState, useEffect, and custom hooks."
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="newStepResourceUrl">Resource URL (Optional)</Label>
            <Input
              id="newStepResourceUrl"
              type="url"
              value={newStepResourceUrl}
              onChange={(e) => setNewStepResourceUrl(e.target.value)}
              placeholder="https://example.com/resource"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="newStepResourceName">Resource Name (Optional)</Label>
            <Input
              id="newStepResourceName"
              value={newStepResourceName}
              onChange={(e) => setNewStepResourceName(e.target.value)}
              placeholder="e.g., React Hooks Documentation (defaults to URL)"
              className="mt-1"
              disabled={!newStepResourceUrl.trim()}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleAddNewStep}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Step
          </Button>
        </CardFooter>
      </Card>

    </div>
  );
}
