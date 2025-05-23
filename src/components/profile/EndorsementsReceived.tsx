
"use client";

import type { Endorsement as EndorsementType } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThumbsUp, MessageSquareText } from "lucide-react"; // Changed icon

const getInitials = (name: string) => {
  if (!name) return "U";
  const names = name.split(' ');
  if (names.length === 1) return names[0][0].toUpperCase();
  return (names[0][0].toUpperCase() + (names[names.length - 1]?.[0]?.toUpperCase() || "")).slice(0,2);
};

interface EndorsementsReceivedProps {
  endorsements: EndorsementType[];
}

export function EndorsementsReceived({ endorsements }: EndorsementsReceivedProps) {
  if (!endorsements || endorsements.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Skill Endorsements</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No endorsements received yet. Share your skills to get recognized!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg border-t-4 border-green-500">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center">
          <MessageSquareText className="mr-3 h-7 w-7 text-green-500" />
          Skill Endorsements Received
        </CardTitle>
        <CardDescription>Recognition from your peers on SkillSync & PeerUp.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {endorsements.map((endorsement) => (
          <div key={endorsement.id} className="p-4 border rounded-lg bg-secondary/20 shadow-sm">
            <div className="flex items-start gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={endorsement.fromUserAvatar || `https://placehold.co/40x40.png?text=${getInitials(endorsement.fromUserName)}`} alt={endorsement.fromUserName} data-ai-hint="user avatar small"/>
                <AvatarFallback>{getInitials(endorsement.fromUserName)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm">
                  <span className="font-semibold text-primary">{endorsement.fromUserName}</span>
                  {' endorsed you for '}
                  <span className="font-semibold text-accent">{endorsement.skill}</span>
                </p>
                <blockquote className="mt-1 pl-3 border-l-2 border-muted italic text-muted-foreground text-sm">
                  "{endorsement.comment}"
                </blockquote>
                <p className="text-xs text-muted-foreground mt-1 text-right">
                  Received: {new Date(endorsement.dateGiven).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
