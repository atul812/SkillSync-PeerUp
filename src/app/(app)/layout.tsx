
"use client"; // Required for SidebarProvider and client components like AppHeader

import { AppHeader } from "@/components/layout/AppHeader";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { mockUserProfile } from "@/lib/mock-data";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import React from "react";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // In a real app, this data would come from an auth context or API
  const user = mockUserProfile;

  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <SidebarInset>
        <AppHeader 
          userName={user.name} 
          avatarUrl={user.avatarUrl}
          tokens={user.tokens}
          streak={user.streak}
        />
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
