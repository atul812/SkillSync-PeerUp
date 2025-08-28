"use client";

import { useState, useEffect } from 'react';
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { X, PlusCircle, Save, Loader2, ArrowLeft } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { availableSkills as allAvailableSkills } from '@/lib/mock-data';
import Link from 'next/link';
import type { UserProfile } from '@/types';

export default function SkillsPage() {
  const { currentUserProfile, loading: authLoading, updateCurrentUserProfile } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Skills state
  const [skillsToTeach, setSkillsToTeach] = useState<string[]>([]);
  const [skillsToLearn, setSkillsToLearn] = useState<string[]>([]);
  const [openTeachPopover, setOpenTeachPopover] = useState(false);
  const [openLearnPopover, setOpenLearnPopover] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (currentUserProfile) {
      setSkillsToTeach(currentUserProfile.skillsToTeach || []);
      setSkillsToLearn(currentUserProfile.skillsToLearn || []);
    }
  }, [currentUserProfile]);

  // Track changes
  useEffect(() => {
    if (currentUserProfile) {
      const originalTeach = currentUserProfile.skillsToTeach || [];
      const originalLearn = currentUserProfile.skillsToLearn || [];
      
      const teachChanged = skillsToTeach.length !== originalTeach.length || 
        skillsToTeach.some(skill => !originalTeach.includes(skill));
      
      const learnChanged = skillsToLearn.length !== originalLearn.length || 
        skillsToLearn.some(skill => !originalLearn.includes(skill));
      
      setIsDirty(teachChanged || learnChanged);
    }
  }, [skillsToTeach, skillsToLearn, currentUserProfile]);

  const handleAddSkill = (type: 'teach' | 'learn', skill: string) => {
    if (!skill.trim()) return;
    
    if (type === 'teach') {
      if (skillsToTeach.length < 10 && !skillsToTeach.includes(skill.trim())) {
        setSkillsToTeach([...skillsToTeach, skill.trim()]);
      }
      setOpenTeachPopover(false);
    } else {
      if (skillsToLearn.length < 10 && !skillsToLearn.includes(skill.trim())) {
        setSkillsToLearn([...skillsToLearn, skill.trim()]);
      }
      setOpenLearnPopover(false);
    }
  };

  const handleRemoveSkill = (type: 'teach' | 'learn', skillToRemove: string) => {
    if (type === 'teach') {
      setSkillsToTeach(skillsToTeach.filter(skill => skill !== skillToRemove));
    } else {
      setSkillsToLearn(skillsToLearn.filter(skill => skill !== skillToRemove));
    }
  };

  const handleSaveChanges = async () => {
    if (!currentUserProfile) {
      toast({ title: "Not Authenticated", description: "Please sign in to update your profile.", variant: "destructive" });
      return;
    }
    
    setIsSubmitting(true);
    try {
      const updatedProfileData: UserProfile = {
        ...currentUserProfile,
        skillsToTeach,
        skillsToLearn,
      };
      
      await updateCurrentUserProfile(updatedProfileData);

      toast({
        title: "Skills Updated",
        description: "Your skills have been successfully updated.",
        variant: "default",
      });
      
      setIsDirty(false);
    } catch (error: any) {
      toast({
        title: "Update Failed",
        description: error.message || "Could not update your skills. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const SkillSelector = ({ type, open, setOpen, currentSkills, onSelectSkill }: { 
    type: 'teach' | 'learn', 
    open: boolean, 
    setOpen: (open: boolean) => void, 
    currentSkills: string[], 
    onSelectSkill: (skill:string) => void 
  }) => {
    const filteredAvailableSkills = allAvailableSkills.filter(s => !currentSkills.includes(s));
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
            Add a skill...
            <PlusCircle className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[--radix-popover-trigger-width] p-0 max-h-60 overflow-y-auto">
          <Command>
            <CommandInput placeholder={`Search skills to ${type}...`} />
            <CommandList>
              <CommandEmpty>No skill found. Select from list or type and click outside.</CommandEmpty>
              <CommandGroup>
                {filteredAvailableSkills.slice(0,100).map((skill) => (
                  <CommandItem
                    key={skill}
                    value={skill}
                    onSelect={(currentValue) => {
                      onSelectSkill(currentValue);
                      setOpen(false);
                    }}
                  >
                    {skill}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  };

  if (authLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-3 text-muted-foreground">Loading skills...</p>
      </div>
    );
  }

  if (!currentUserProfile && !authLoading) {
     return (
      <Card className="max-w-2xl mx-auto shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl">Profile Not Found</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Please sign in to view and edit your skills.</p>
        </CardContent>
         <CardFooter>
            <Link href="/signin">
                <Button>Go to Sign In</Button>
            </Link>
        </CardFooter>
      </Card>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <Link href="/dashboard" className="flex items-center text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
      </Link>
      
      <Card className="max-w-2xl mx-auto shadow-xl border-t-4 border-primary">
        <CardHeader>
          <CardTitle className="text-2xl">Edit Your Skills</CardTitle>
          <CardDescription>
            Update the skills you can teach others and the ones you want to learn.
            This helps us find the best skill matches for you.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Skills to Teach Section */}
          <div>
            <h3 className="text-lg font-medium mb-2">Skills You Can Teach</h3>
            <div className="flex flex-wrap gap-2 mb-2 min-h-[2.5rem] p-2 border rounded-md bg-background items-center">
              {skillsToTeach.map(skill => (
                <Badge key={skill} variant="secondary" className="text-sm px-2 py-1 bg-green-100 text-green-700 border-green-300">
                  {skill}
                  <button type="button" onClick={() => handleRemoveSkill('teach', skill)} className="ml-1.5 text-green-700 hover:text-green-900">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              {skillsToTeach.length === 0 && <span className="text-sm text-muted-foreground">No skills added yet.</span>}
            </div>
            {skillsToTeach.length < 10 && (
              <SkillSelector 
                type="teach"
                open={openTeachPopover}
                setOpen={setOpenTeachPopover}
                currentSkills={skillsToTeach}
                onSelectSkill={(skill) => handleAddSkill('teach', skill)}
              />
            )}
            <p className="text-sm text-muted-foreground mt-1">List up to 10 skills you're proficient in and willing to teach.</p>
          </div>
          
          {/* Skills to Learn Section */}
          <div>
            <h3 className="text-lg font-medium mb-2">Skills You Want to Learn</h3>
            <div className="flex flex-wrap gap-2 mb-2 min-h-[2.5rem] p-2 border rounded-md bg-background items-center">
              {skillsToLearn.map(skill => (
                <Badge key={skill} variant="outline" className="text-sm px-2 py-1 bg-blue-100 text-blue-700 border-blue-300">
                  {skill}
                  <button type="button" onClick={() => handleRemoveSkill('learn', skill)} className="ml-1.5 text-blue-700 hover:text-blue-900">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              {skillsToLearn.length === 0 && <span className="text-sm text-muted-foreground">No skills added yet.</span>}
            </div>
            {skillsToLearn.length < 10 && (
              <SkillSelector 
                type="learn"
                open={openLearnPopover}
                setOpen={setOpenLearnPopover}
                currentSkills={skillsToLearn}
                onSelectSkill={(skill) => handleAddSkill('learn', skill)}
              />
            )}
            <p className="text-sm text-muted-foreground mt-1">List up to 10 skills you're eager to learn from others.</p>
          </div>
        </CardContent>
        
        <CardFooter>
          <Button 
            onClick={handleSaveChanges} 
            disabled={isSubmitting || authLoading || !isDirty} 
            className="w-full md:w-auto"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-pulse" /> Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" /> Save Changes
              </>
            )}
          </Button>
          {!isDirty && !isSubmitting && !authLoading && <p className="ml-4 text-sm text-muted-foreground">No changes to save.</p>}
        </CardFooter>
      </Card>
    </div>
  );
}