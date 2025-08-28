import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface IllustratedFeatureCardProps {
  title: string;
  description: string;
  linkHref: string;
  linkText: string;
  illustration: React.ReactNode;
  gradientFrom?: string;
  gradientTo?: string;
}

export function IllustratedFeatureCard({
  title,
  description,
  linkHref,
  linkText,
  illustration,
  gradientFrom = "from-primary",
  gradientTo = "to-secondary"
}: IllustratedFeatureCardProps) {
  return (
    <Card className="shadow-lg border border-border/50 overflow-hidden h-full transition-all duration-300 hover:shadow-xl hover:border-primary/20 animate-fade-in">
      <div className={`absolute h-1 bg-gradient-to-r ${gradientFrom} ${gradientTo} w-full top-0`}></div>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center">
          <span className={`bg-clip-text text-transparent bg-gradient-to-r ${gradientFrom} ${gradientTo}`}>
            {title}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center py-4">
          {illustration}
        </div>
        <p className="text-foreground/70">{description}</p>
        <Link href={linkHref} className="block">
          <Button 
            variant="ghost" 
            className={`w-full justify-between hover:bg-${gradientFrom.replace('from-', '')}/10 group`}
          >
            {linkText}
            <ArrowRight className={`h-4 w-4 ml-2 transition-transform group-hover:translate-x-1 text-${gradientFrom.replace('from-', '')}`} />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}