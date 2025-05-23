
"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, User, signOut as firebaseSignOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '@/lib/firebase'; // Use the initialized auth instance
import type { UserProfile } from '@/types';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';


interface AuthContextType {
  currentUserProfile: UserProfile | null;
  firebaseUser: User | null;
  loading: boolean;
  signUpUser: (email: string, password: string, name: string) => Promise<void>;
  signInUser: (email: string, password: string) => Promise<void>;
  signOutUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [currentUserProfile, setCurrentUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
      if (user) {
        // Create a basic UserProfile from Firebase User.
        // In a real app, you'd fetch more details from Firestore/your backend.
        const profileName = user.displayName || "New User";
        const initials = profileName.split(' ').map(n => n[0]).join('').toUpperCase() || 'U';
        
        setCurrentUserProfile({
          id: user.uid,
          name: profileName,
          bio: `Welcome ${profileName}! Update your bio in the profile section.`, // Default bio
          skillsToTeach: [], 
          skillsToLearn: [], 
          tokens: 0, 
          streak: 0, 
          avatarUrl: user.photoURL || `https://placehold.co/100x100.png?text=${initials}`,
        });
      } else {
        setCurrentUserProfile(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signUpUser = async (email: string, password: string, name: string) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      // The onAuthStateChanged listener will update firebaseUser and currentUserProfile
      // You might want to create a user document in Firestore/RTDB here as well
      router.push('/profile'); // Redirect to profile to complete setup
    } catch (error: any) {
      console.error("Error signing up:", error);
      toast({ title: "Sign Up Error", description: error.message, variant: "destructive" });
      throw error; 
    } finally {
      setLoading(false);
    }
  };

  const signInUser = async (email: string, password: string) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // The onAuthStateChanged listener will update firebaseUser and currentUserProfile
      router.push('/dashboard'); 
    } catch (error: any) {
      console.error("Error signing in:", error);
      toast({ title: "Sign In Error", description: error.message, variant: "destructive" });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOutUser = async () => {
    setLoading(true);
    try {
      await firebaseSignOut(auth);
      setCurrentUserProfile(null); // Explicitly clear profile
      setFirebaseUser(null); // Explicitly clear firebase user
      router.push('/signin');
    } catch (error: any) {
      console.error("Error signing out:", error);
      toast({ title: "Sign Out Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ currentUserProfile, firebaseUser, loading, signUpUser, signInUser, signOutUser }}>
      {!loading && children}
      {loading && (
         <div className="flex h-screen w-full items-center justify-center bg-background">
          {/* You can replace this with a more sophisticated loading spinner component */}
          <svg className="animate-spin h-10 w-10 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      )}
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
