
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
import { Home, User, Search, BookOpen, BarChart3, Settings, MessageSquare, Zap } from "lucide-react";
import { Button } from "../ui/button";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/profile", label: "My Profile", icon: User },
  { href: "/matches", label: "Find Matches", icon: Search },
  { href: "/roadmap", label: "Learning Roadmap", icon: BookOpen },
  { href: "/leaderboard", label: "Leaderboard", icon: BarChart3 },
  { href: "/chat", label: "Messages", icon: MessageSquare, disabled: true },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar side="left" variant="sidebar" collapsible="icon">
      <SidebarHeader className="p-0 items-center justify-center h-16 border-b">
        {/* Mobile trigger is in AppHeader, this trigger is for desktop sidebar collapse/expand */}
        <SidebarTrigger className="hidden md:flex" />
      </SidebarHeader>
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
                  className={item.disabled ? "cursor-not-allowed opacity-50" : ""}
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
         <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
            <Zap className="mr-2 h-4 w-4" /> Boost Learning
         </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
