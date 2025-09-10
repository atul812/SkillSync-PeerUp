
"use client";

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link'; // Added Link import
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import type { UserProfile } from '@/types';
import { availableSkills as allAvailableSkills } from '@/lib/mock-data';
import { useToast } from "@/hooks/use-toast";
import { X, PlusCircle, Save, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { useAuth } from '@/contexts/AuthContext';

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters.").max(50, "Name too long."),
  bio: z.string().max(500, "Bio cannot exceed 500 characters.").optional().default(""),
  skillsToTeach: z.array(z.string()).max(10, "You can list up to 10 skills to teach.").default([]),
  skillsToLearn: z.array(z.string()).max(10, "You can list up to 10 skills to learn.").default([]),
  avatarUrl: z.string().url("Invalid URL for avatar (e.g. https://placehold.co/100x100.png)").or(z.literal("")).optional().default(""),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export function EditProfileForm() {
  const { toast } = useToast();
  const { currentUserProfile, loading: authLoading, updateCurrentUserProfile } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      bio: "",
      skillsToTeach: [],
      skillsToLearn: [],
      avatarUrl: "",
    },
  });

  useEffect(() => {
    if (currentUserProfile) {
      form.reset({
        name: currentUserProfile.name || "",
        bio: currentUserProfile.bio || "",
        skillsToTeach: currentUserProfile.skillsToTeach || [],
        skillsToLearn: currentUserProfile.skillsToLearn || [],
        avatarUrl: currentUserProfile.avatarUrl || "",
      });
    }
  }, [currentUserProfile, form]);


  const [openTeachPopover, setOpenTeachPopover] = useState(false);
  const [openLearnPopover, setOpenLearnPopover] = useState(false);

  const handleAddSkill = (type: 'teach' | 'learn', skill: string) => {
    if (!skill.trim()) return;
    const fieldName = type === 'teach' ? "skillsToTeach" : "skillsToLearn";
    const currentSkills = form.getValues(fieldName);
    if (currentSkills.length < 10 && !currentSkills.includes(skill.trim())) {
      const newSkills = [...currentSkills, skill.trim()];
      form.setValue(fieldName, newSkills, { shouldValidate: true, shouldDirty: true });
    }
    type === 'teach' ? setOpenTeachPopover(false) : setOpenLearnPopover(false);
  };

  const handleRemoveSkill = (type: 'teach' | 'learn', skillToRemove: string) => {
    const fieldName = type === 'teach' ? "skillsToTeach" : "skillsToLearn";
    const currentSkills = form.getValues(fieldName);
    const newSkills = currentSkills.filter(skill => skill !== skillToRemove);
    form.setValue(fieldName, newSkills, { shouldValidate: true, shouldDirty: true });
  };

  async function onSubmit(data: ProfileFormData) {
    if (!currentUserProfile) {
      toast({ title: "Not Authenticated", description: "Please sign in to update your profile.", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    try {
      // Ensure ID and other non-form fields are preserved if they exist on currentUserProfile
      const updatedProfileData: UserProfile = {
        ...currentUserProfile, // Spread existing profile to keep id, tokens, streak etc.
        name: data.name,
        bio: data.bio,
        skillsToTeach: data.skillsToTeach,
        skillsToLearn: data.skillsToLearn,
        avatarUrl: data.avatarUrl || `https://placehold.co/100x100.png?text=${data.name.split(' ').map(n=>n[0]).join('').toUpperCase() || 'U'}`, // Default placeholder if empty
      };
      
      await updateCurrentUserProfile(updatedProfileData);

      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated (locally).",
        variant: "default",
      });
      form.reset(updatedProfileData); // Reset form with new data to clear dirty state
    } catch (error: any) {
      toast({
        title: "Update Failed",
        description: error.message || "Could not update your profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
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
        <PopoverContent className="w-[--radix-popover-trigger-width] p-0 max-h-60 overflow-y-auto">
          <Command>
            <CommandInput placeholder={`Search skills to ${type}...`} />
            <CommandList>
              <CommandEmpty>No skill found. Select from list or type and click outside (custom add not fully supported).</CommandEmpty>
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
        <p className="ml-3 text-muted-foreground">Loading profile...</p>
      </div>
    );
  }

  if (!currentUserProfile && !authLoading) { // Added !authLoading condition
     return (
      <Card className="max-w-2xl mx-auto shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl">Profile Not Found</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Please sign in to view and edit your profile.</p>
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
    <Card className="max-w-2xl mx-auto shadow-xl border-t-4 border-primary">
      <CardHeader>
        <CardTitle className="text-2xl">Edit Your Profile</CardTitle>
        <CardDescription>Keep your skills and bio up-to-date to find the best matches. (Changes saved locally)</CardDescription>
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
              name="avatarUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Avatar URL (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="https://placehold.co/100x100.png" {...field} />
                  </FormControl>
                   <FormDescription>Link to your profile picture. Leave blank for default placeholder.</FormDescription>
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

            <FormField
              control={form.control}
              name="skillsToTeach"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skills You Can Teach</FormLabel>
                  <div className="flex flex-wrap gap-2 mb-2 min-h-[2.5rem] p-2 border rounded-md bg-background items-center">
                    {field.value.map(skill => (
                      <Badge key={skill} variant="secondary" className="text-sm px-2 py-1 bg-green-100 text-green-700 border-green-300">
                        {skill}
                        <button type="button" onClick={() => handleRemoveSkill('teach', skill)} className="ml-1.5 text-green-700 hover:text-green-900">
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                     {field.value.length === 0 && <span className="text-sm text-muted-foreground">No skills added yet.</span>}
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
                  <FormDescription>List up to 10 skills you&apos;re proficient in and willing to teach.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="skillsToLearn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skills You Want to Learn</FormLabel>
                   <div className="flex flex-wrap gap-2 mb-2 min-h-[2.5rem] p-2 border rounded-md bg-background items-center">
                    {field.value.map(skill => (
                      <Badge key={skill} variant="outline" className="text-sm px-2 py-1 bg-blue-100 text-blue-700 border-blue-300">
                        {skill}
                        <button type="button" onClick={() => handleRemoveSkill('learn', skill)} className="ml-1.5 text-blue-700 hover:text-blue-900">
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                    {field.value.length === 0 && <span className="text-sm text-muted-foreground">No skills added yet.</span>}
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
                  <FormDescription>List up to 10 skills you&apos;re eager to learn from others.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isSubmitting || authLoading || !form.formState.isDirty} className="w-full md:w-auto">
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
             {!form.formState.isDirty && !isSubmitting && !authLoading && <p className="ml-4 text-sm text-muted-foreground">No changes to save.</p>}
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
