
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Home, User, Search, BookOpen, BarChart3, Settings, MessageSquare, Zap, Gem, Sparkles } from "lucide-react";
import { Button } from "../ui/button";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/profile", label: "My Profile", icon: User },
  { href: "/matches", label: "Find Matches", icon: Search },
  { href: "/roadmap", label: "Learning Roadmap", icon: BookOpen },
  { href: "/leaderboard", label: "Leaderboard", icon: BarChart3 },
  { href: "/chat", label: "Messages", icon: MessageSquare, disabled: false },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar side="left" variant="sidebar" collapsible="icon" className="border-r border-border/50 bg-gradient-to-b from-background to-background/95">
      <SidebarHeader className="p-4 items-center justify-center h-20 border-b">
        {/* Mobile trigger is in AppHeader, this trigger is for desktop sidebar collapse/expand */}
        <SidebarTrigger className="hidden md:flex" />
        <Link href="/dashboard" className="flex items-center space-x-2 group">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center group-hover:shadow-md transition-all duration-300">
            <span className="text-white font-bold text-sm">S</span>
          </div>
          <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">SahaAcharya</span>
        </Link>
      </SidebarHeader>
      
      <div className="px-4 py-2 mb-2">
        <div className="bg-primary/5 rounded-lg p-3 border border-primary/10">
          <div className="flex items-center mb-2">
            <Sparkles className="h-4 w-4 text-primary mr-2" />
            <span className="text-sm font-medium">Learning Streak</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold">7</span>
            <div className="h-2 w-24 bg-background rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary to-accent w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
      
      <SidebarContent className="p-2">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <Link href={item.href} passHref legacyBehavior>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href))}
                  tooltip={{ children: item.label, className: "capitalize" }}
                  disabled={item.disabled}
                  aria-disabled={item.disabled}
                  className={`${item.disabled ? "cursor-not-allowed opacity-50" : ""} hover:bg-primary/10 hover:text-primary transition-colors rounded-lg ${pathname === item.href ? "bg-primary/15 text-primary font-medium" : ""}`}
                >
                  <a>
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </a>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t">
         <Link href="/premium" passHref className="w-full">
            <Button className="w-full bg-gradient-to-r from-primary/80 to-accent/80 hover:from-primary hover:to-accent text-white shadow-md hover:shadow-lg transition-all duration-300">
                <Gem className="mr-2 h-4 w-4" /> Boost Learning
            </Button>
         </Link>
         <div className="mt-4 pt-4 border-t border-border/50 text-center">
           <p className="text-xs text-foreground/60">Need help?</p>
           <Link href="#" className="text-xs text-primary hover:underline">Contact Support</Link>
         </div>
      </SidebarFooter>
    </Sidebar>
  );
}
