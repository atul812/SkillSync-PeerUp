
"use client"; // Ensure it's a client component

import { EditProfileForm } from "@/components/profile/EditProfileForm";
import { BadgesDisplay } from "@/components/profile/BadgesDisplay";
import { EndorsementsReceived } from "@/components/profile/EndorsementsReceived";
import { useAuth } from "@/contexts/AuthContext";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";

export default function ProfilePage() {
  const { currentUserProfile, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-lg text-muted-foreground">Loading your profile...</p>
      </div>
    );
  }

  if (!currentUserProfile) {
    // This case should ideally be handled by the AppLayout redirecting to signin
    // but as a fallback:
    return (
      <div className="container mx-auto py-8 text-center">
        <p className="text-xl text-muted-foreground">Please sign in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      <EditProfileForm />
      <Separator />
      <BadgesDisplay badges={currentUserProfile.badges || []} />
      <Separator />
      <EndorsementsReceived endorsements={currentUserProfile.endorsementsReceived || []} />
    </div>
  );
}
