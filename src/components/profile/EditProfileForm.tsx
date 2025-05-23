
"use client";

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import type { UserProfile } from '@/types';
import { mockUserProfile, availableSkills as allAvailableSkills } from '@/lib/mock-data'; // For initial data and skill suggestions
import { useToast } from "@/hooks/use-toast";
import { X, PlusCircle, Save } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { cn } from '@/lib/utils';

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  bio: z.string().max(500, "Bio cannot exceed 500 characters.").optional(),
  skillsToTeach: z.array(z.string()).max(10, "You can list up to 10 skills to teach."),
  skillsToLearn: z.array(z.string()).max(10, "You can list up to 10 skills to learn."),
});

type ProfileFormData = z.infer<typeof profileSchema>;

// Dummy update function - in a real app, this would be a server action
async function updateUserProfile(data: ProfileFormData): Promise<UserProfile> {
  console.log("Updating profile:", data);
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return {
    ...mockUserProfile, // Return updated mock profile
    ...data,
  };
}


export function EditProfileForm() {
  const { toast } = useToast();
  const [currentUser, setCurrentUser] = useState<UserProfile>(mockUserProfile); // Or fetch from context/API

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: currentUser.name || "",
      bio: currentUser.bio || "",
      skillsToTeach: currentUser.skillsToTeach || [],
      skillsToLearn: currentUser.skillsToLearn || [],
    },
  });

  const [teachSkillInput, setTeachSkillInput] = useState('');
  const [learnSkillInput, setLearnSkillInput] = useState('');
  
  const [openTeachPopover, setOpenTeachPopover] = useState(false);
  const [openLearnPopover, setOpenLearnPopover] = useState(false);


  const handleAddSkill = (type: 'teach' | 'learn', skill: string) => {
    if (!skill.trim()) return;
    const currentSkills = type === 'teach' ? form.getValues("skillsToTeach") : form.getValues("skillsToLearn");
    if (currentSkills.length < 10 && !currentSkills.includes(skill.trim())) {
      const newSkills = [...currentSkills, skill.trim()];
      type === 'teach' ? form.setValue("skillsToTeach", newSkills) : form.setValue("skillsToLearn", newSkills);
    }
    type === 'teach' ? setTeachSkillInput('') : setLearnSkillInput('');
    type === 'teach' ? setOpenTeachPopover(false) : setOpenLearnPopover(false);
  };

  const handleRemoveSkill = (type: 'teach' | 'learn', skillToRemove: string) => {
    const currentSkills = type === 'teach' ? form.getValues("skillsToTeach") : form.getValues("skillsToLearn");
    const newSkills = currentSkills.filter(skill => skill !== skillToRemove);
    type === 'teach' ? form.setValue("skillsToTeach", newSkills) : form.setValue("skillsToLearn", newSkills);
  };

  async function onSubmit(data: ProfileFormData) {
    try {
      const updatedProfile = await updateUserProfile(data);
      setCurrentUser(updatedProfile); // Update local state if needed
      toast({
        title: "Profile Updated",
        description: "Your SkillSwap profile has been successfully updated.",
        variant: "default",
      });
      // Potentially redirect or refresh data on other parts of the app
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Could not update your profile. Please try again.",
        variant: "destructive",
      });
    }
  }
  
  const SkillSelector = ({ type, open, setOpen, currentSkills, onSelectSkill }: { type: 'teach' | 'learn', open: boolean, setOpen: (open: boolean) => void, currentSkills: string[], onSelectSkill: (skill:string) => void }) => {
    const filteredAvailableSkills = allAvailableSkills.filter(s => !currentSkills.includes(s));
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
            Add a skill...
            <PlusCircle className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
          <Command>
            <CommandInput placeholder={`Search skills to ${type}...`} />
            <CommandList>
              <CommandEmpty>No skill found. You can add a custom skill by typing and pressing Enter (if implemented).</CommandEmpty>
              <CommandGroup>
                {filteredAvailableSkills.slice(0,100).map((skill) => ( // Limit displayed skills for performance
                  <CommandItem
                    key={skill}
                    value={skill}
                    onSelect={(currentValue) => {
                      onSelectSkill(currentValue);
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


  return (
    <Card className="max-w-2xl mx-auto shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl">Edit Your SkillSwap Profile</CardTitle>
        <CardDescription>Keep your skills and bio up-to-date to find the best matches.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Alex Johnson" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio / Introduction</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Tell us a bit about yourself, your learning goals, and what you're passionate about." {...field} className="min-h-[100px]" />
                  </FormControl>
                  <FormDescription>Max 500 characters. This helps others understand you better.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Skills to Teach */}
            <FormField
              control={form.control}
              name="skillsToTeach"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skills You Can Teach</FormLabel>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {field.value.map(skill => (
                      <Badge key={skill} variant="secondary" className="text-sm px-2 py-1 bg-green-100 text-green-700 border-green-300">
                        {skill}
                        <button type="button" onClick={() => handleRemoveSkill('teach', skill)} className="ml-1.5 text-green-700 hover:text-green-900">
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  {field.value.length < 10 && (
                     <SkillSelector 
                        type="teach"
                        open={openTeachPopover}
                        setOpen={setOpenTeachPopover}
                        currentSkills={field.value}
                        onSelectSkill={(skill) => handleAddSkill('teach', skill)}
                     />
                  )}
                  <FormDescription>List up to 10 skills you're proficient in and willing to teach.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Skills to Learn */}
            <FormField
              control={form.control}
              name="skillsToLearn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skills You Want to Learn</FormLabel>
                   <div className="flex flex-wrap gap-2 mb-2">
                    {field.value.map(skill => (
                      <Badge key={skill} variant="outline" className="text-sm px-2 py-1 bg-blue-100 text-blue-700 border-blue-300">
                        {skill}
                        <button type="button" onClick={() => handleRemoveSkill('learn', skill)} className="ml-1.5 text-blue-700 hover:text-blue-900">
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  {field.value.length < 10 && (
                    <SkillSelector 
                        type="learn"
                        open={openLearnPopover}
                        setOpen={setOpenLearnPopover}
                        currentSkills={field.value}
                        onSelectSkill={(skill) => handleAddSkill('learn', skill)}
                     />
                  )}
                  <FormDescription>List up to 10 skills you're eager to learn from others.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={form.formState.isSubmitting} className="w-full md:w-auto">
              {form.formState.isSubmitting ? (
                <>
                  <Save className="mr-2 h-4 w-4 animate-pulse" /> Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" /> Save Changes
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
