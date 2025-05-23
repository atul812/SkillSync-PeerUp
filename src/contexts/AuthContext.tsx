
"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import type { UserProfile } from '@/types';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

const LOCAL_STORAGE_USER_KEY = 'skillSyncPeerUpUserProfile'; // Updated key

interface AuthContextType {
  currentUserProfile: UserProfile | null;
  loading: boolean;
  signUpUser: (email: string, password: string, name: string) => Promise<void>; // Password is not really used for check
  signInUser: (email: string, password: string) => Promise<void>; // Password is not really used for check
  signOutUser: () => Promise<void>;
  updateCurrentUserProfile: (updatedProfileData: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUserProfile, setCurrentUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    setLoading(true);
    try {
      const storedUser = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
      if (storedUser) {
        setCurrentUserProfile(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Error loading user from localStorage:", error);
      localStorage.removeItem(LOCAL_STORAGE_USER_KEY); // Clear corrupted data
    }
    setLoading(false);
  }, []);

  const signUpUser = async (email: string, password: string, name: string) => {
    setLoading(true);
    // Basic validation (in a real app, do more)
    if (!email || !password || !name) {
      toast({ title: "Sign Up Error", description: "All fields are required.", variant: "destructive" });
      setLoading(false);
      throw new Error("All fields are required.");
    }

    // Mock: Check if email already exists (in a real app, check DB)
    const existingUser = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
    if (existingUser && JSON.parse(existingUser).email === email) {
        toast({ title: "Sign Up Error", description: "Email already in use.", variant: "destructive" });
        setLoading(false);
        throw new Error("Email already in use.");
    }
    
    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase() || 'U';
    const newUserProfile: UserProfile = {
      id: email, // Using email as ID for simplicity in mock
      name,
      email, // Storing email for mock sign-in check
      bio: `Welcome ${name}! Update your bio to get started.`,
      skillsToTeach: [],
      skillsToLearn: [],
      tokens: 0,
      streak: 0,
      avatarUrl: `https://placehold.co/100x100.png?text=${initials}`,
    };

    try {
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(newUserProfile));
      setCurrentUserProfile(newUserProfile);
      toast({ title: "Account Created!", description: `Welcome ${name}! Please complete your profile.` });
      router.push('/profile');
    } catch (error) {
      console.error("Error saving user to localStorage during signup:", error);
      toast({ title: "Sign Up Error", description: "Could not create account.", variant: "destructive" });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signInUser = async (email: string, password: string) => {
    setLoading(true);
    if (!email || !password) {
      toast({ title: "Sign In Error", description: "Email and password are required.", variant: "destructive" });
      setLoading(false);
      throw new Error("Email and password are required.");
    }
    try {
      const storedUser = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
      if (storedUser) {
        const user: UserProfile & { email?: string } = JSON.parse(storedUser);
        // Mock check: In a real app, you'd verify the password against a hash.
        // Here, we just check if the email matches the one stored during a mock signup.
        if (user.email === email || user.id === email) { // Allow sign in with id (which is email) or actual email field
          setCurrentUserProfile(user as UserProfile);
          toast({ title: "Signed In", description: `Welcome back, ${user.name}!` });
          router.push('/dashboard');
        } else {
          toast({ title: "Sign In Error", description: "Invalid email or password.", variant: "destructive" });
          throw new Error("Invalid email or password.");
        }
      } else {
        toast({ title: "Sign In Error", description: "No user found. Please sign up.", variant: "destructive" });
        throw new Error("No user found.");
      }
    } catch (error) {
      console.error("Error during sign in:", error);
      // Toast is handled above or if error is not one of ours
      if (!(error instanceof Error && (error.message === "Invalid email or password." || error.message === "No user found."))) {
        toast({ title: "Sign In Error", description: "An unexpected error occurred.", variant: "destructive" });
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOutUser = async () => {
    setLoading(true);
    try {
      localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
      setCurrentUserProfile(null);
      toast({ title: "Signed Out", description: "You have been successfully signed out." });
      router.push('/signin');
    } catch (error) {
      console.error("Error signing out:", error);
      toast({ title: "Sign Out Error", description: "Could not sign out.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const updateCurrentUserProfile = async (updatedProfileData: Partial<UserProfile>) => {
    if (!currentUserProfile) {
      toast({ title: "Error", description: "No user logged in to update.", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const newProfile = { ...currentUserProfile, ...updatedProfileData };
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(newProfile));
      setCurrentUserProfile(newProfile);
      // toast({ title: "Profile Updated", description: "Your profile has been saved locally." });
    } catch (error) {
      console.error("Error updating profile in localStorage:", error);
      toast({ title: "Update Error", description: "Could not save profile changes.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ currentUserProfile, loading, signUpUser, signInUser, signOutUser, updateCurrentUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
