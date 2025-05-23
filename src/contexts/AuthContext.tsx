
"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import type { UserProfile, Badge, Endorsement } from '@/types';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

const LOCAL_STORAGE_USER_KEY = 'skillSyncPeerUpUserProfile'; // Updated key

// Mock data for new users
const mockBadges: Badge[] = [
  { id: "badge1", name: "Welcome Aboard!", iconName: "Ship", description: "Joined SkillSync & PeerUp.", dateEarned: new Date().toISOString().split('T')[0] },
  { id: "badge2", name: "Profile Pioneer", iconName: "UserCheck", description: "Completed your first profile update.", dateEarned: new Date().toISOString().split('T')[0] },
];

const mockEndorsements: Endorsement[] = [
  { id: "endorse1", fromUserName: "AI Helper", skill: "Enthusiasm", comment: "Great enthusiasm for learning!", dateGiven: new Date().toISOString().split('T')[0], fromUserAvatar: "https://placehold.co/40x40.png" },
];


interface AuthContextType {
  currentUserProfile: UserProfile | null;
  loading: boolean;
  signUpUser: (email: string, password: string, name: string) => Promise<void>;
  signInUser: (email: string, password: string) => Promise<void>;
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
        const user: UserProfile = JSON.parse(storedUser);
        setCurrentUserProfile({
          ...user,
          badges: user.badges || [], // Ensure arrays exist
          endorsementsReceived: user.endorsementsReceived || [],
        });
      }
    } catch (error) {
      console.error("Error loading user from localStorage:", error);
      localStorage.removeItem(LOCAL_STORAGE_USER_KEY); // Clear corrupted data
    }
    setLoading(false);
  }, []);

  const signUpUser = async (email: string, password: string, name: string) => {
    setLoading(true);
    if (!email || !password || !name) {
      toast({ title: "Sign Up Error", description: "All fields are required.", variant: "destructive" });
      setLoading(false);
      throw new Error("All fields are required.");
    }
    
    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase() || 'U';
    const newUserProfile: UserProfile = {
      id: email.toLowerCase(), // Use lowercase email as ID for mock consistency
      name,
      email: email.toLowerCase(), 
      bio: `Welcome ${name}! Update your bio to get started.`,
      skillsToTeach: [],
      skillsToLearn: [],
      tokens: 0,
      streak: 0,
      avatarUrl: `https://placehold.co/100x100.png?text=${initials}`,
      badges: mockBadges.map(b => ({...b, dateEarned: new Date().toISOString().split('T')[0]})), // Ensure fresh dates
      endorsementsReceived: mockEndorsements.map(e => ({...e, dateGiven: new Date().toISOString().split('T')[0]})),
    };

    try {
      // Sign up always overwrites the current mock user in localStorage
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(newUserProfile));
      setCurrentUserProfile(newUserProfile);
      toast({ title: "Account Created!", description: `Welcome ${name}! Check out your new badges and profile.` });
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
    const normalizedEmail = email.toLowerCase();

    if (!normalizedEmail || !password) {
      toast({ title: "Sign In Error", description: "Email and password are required.", variant: "destructive" });
      setLoading(false);
      throw new Error("Email and password are required.");
    }
    try {
      const storedUser = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
      if (storedUser) {
        const user: UserProfile = JSON.parse(storedUser);
        // For mock, we check if the stored email/id (which should be lowercase) matches the lowercase input email.
        // Password check is ignored for this mock system.
        if (user.email === normalizedEmail || user.id === normalizedEmail) {
           setCurrentUserProfile({
            ...user,
            badges: user.badges || [],
            endorsementsReceived: user.endorsementsReceived || [],
          });
          toast({ title: "Signed In", description: `Welcome back, ${user.name}!` });
          router.push('/dashboard');
        } else {
          toast({ title: "Sign In Error", description: "Invalid email or password.", variant: "destructive" });
          throw new Error("Invalid email or password.");
        }
      } else {
        // This is where "No user found" is triggered.
        toast({ title: "Sign In Error", description: "No user found. Please sign up.", variant: "destructive" });
        throw new Error("No user found.");
      }
    } catch (error: any) {
      console.error("Error during sign in:", error);
      // Avoid double-toasting if specific errors were already toasted
      if (!(error instanceof Error && (error.message === "Invalid email or password." || error.message === "No user found." || error.message === "Email and password are required."))) {
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
      const newProfile: UserProfile = { 
        ...currentUserProfile, 
        ...updatedProfileData,
        badges: updatedProfileData.badges || currentUserProfile.badges || [],
        endorsementsReceived: updatedProfileData.endorsementsReceived || currentUserProfile.endorsementsReceived || [],
      };
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(newProfile));
      setCurrentUserProfile(newProfile);
      // toast({ title: "Profile Updated", description: "Your profile has been saved." }); // Toast handled in EditProfileForm
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

    