
"use client"; 

import { AppHeader } from "@/components/layout/AppHeader";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import React, { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react"; 

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { currentUserProfile, loading, signOutUser } = useAuth(); 
  const router = useRouter();

  useEffect(() => {
    if (!loading && !currentUserProfile) {
      router.replace('/signin'); 
    }
  }, [currentUserProfile, loading, router]);

  if (loading) { // Show loader if auth state is loading OR if user is null but still loading
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 text-lg text-muted-foreground">Loading your SahaAcharya experience...</p>
      </div>
    );
  }

  if (!currentUserProfile) { // If done loading and still no user, show minimal or redirect (already handled by useEffect)
     // This state should ideally be brief due to the useEffect redirect.
     // You could show a "Redirecting to sign-in..." message or a blank screen.
    return (
        <div className="flex h-screen w-full items-center justify-center bg-background">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="ml-4 text-lg text-muted-foreground">Redirecting to sign in...</p>
      </div>
    );
  }
  
  const user = currentUserProfile; 

  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <SidebarInset>
        <AppHeader 
          userName={user.name} 
          avatarUrl={user.avatarUrl}
          tokens={user.tokens}
          streak={user.streak}
          onSignOut={signOutUser} 
        />
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto bg-secondary/20">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
