
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Flame, Coins, Menu, LogOut, UserCircle, Settings, BarChart3, Loader2 } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar"; 
import { useAuth } from "@/contexts/AuthContext"; 
import { useState } from "react"; 

interface AppHeaderProps {
  userName: string;
  avatarUrl?: string;
  tokens: number;
  streak: number;
  onSignOut: () => Promise<void>; 
}

export function AppHeader({ userName, avatarUrl, tokens, streak, onSignOut }: AppHeaderProps) {
  const { toggleSidebar, isMobile } = useSidebar(); 
  const [isSigningOut, setIsSigningOut] = useState(false);

  const getInitials = (name: string) => {
    if (!name) return "U";
    const names = name.split(' ');
    if (names.length === 0 || !names[0]) return "U";
    if (names.length === 1) return names[0][0].toUpperCase();
    return (names[0][0].toUpperCase() + (names[names.length - 1][0]?.toUpperCase() || "")).slice(0,2);
  }

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await onSignOut();
    } catch (error) {
      console.error("Sign out error in header", error);
      // Toast is handled in AuthContext
    } finally {
      setIsSigningOut(false);
    }
  };


  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 shadow-sm">
      {isMobile && (
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      )}
      <div className="flex-1">
        <Link href="/dashboard" className="flex items-center gap-2">
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7 text-primary">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2.5-8.5L12 14l2.5-2.5L17 14l-5-5-5 5z"/>
          </svg>
          <span className="text-xl font-semibold text-foreground">SkillSync & PeerUp</span>
        </Link>
      </div>
      
      <div className="flex items-center gap-4 md:gap-6">
        <div className="flex items-center gap-1 text-sm font-medium text-muted-foreground" title="Your current streak">
          <Flame className="h-5 w-5 text-orange-500" />
          <span>{streak}</span>
        </div>
        <div className="flex items-center gap-1 text-sm font-medium text-muted-foreground" title="Your available tokens">
          <Coins className="h-5 w-5 text-yellow-500" />
          <span>{tokens}</span>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar className="h-9 w-9">
                <AvatarImage src={avatarUrl} alt={userName} data-ai-hint="profile avatar" />
                <AvatarFallback>{getInitials(userName)}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{userName}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  Student
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/profile" className="flex items-center gap-2 cursor-pointer">
                <UserCircle className="h-4 w-4" />
                <span>Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/leaderboard" className="flex items-center gap-2 cursor-pointer">
                <BarChart3 className="h-4 w-4" />
                <span>Leaderboard</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem disabled className="flex items-center gap-2 cursor-not-allowed">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleSignOut}
              disabled={isSigningOut}
              className="flex items-center gap-2 cursor-pointer text-red-600 hover:!text-red-600 focus:!text-red-600 focus:!bg-red-50"
            >
              {isSigningOut ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogOut className="h-4 w-4" />}
              <span>{isSigningOut ? "Signing Out..." : "Log out"}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
