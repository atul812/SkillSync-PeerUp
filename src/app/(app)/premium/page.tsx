
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BrainCircuit, MapPin, DollarSign, Share2, ClipboardCheck, Sparkles, Gem } from "lucide-react";
import Link from "next/link";

interface PremiumFeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function PremiumFeatureCard({ icon, title, description }: PremiumFeatureProps) {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card/50">
      <CardHeader className="items-center text-center">
        {icon}
        <CardTitle className="mt-4 text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-center text-base min-h-[3em]">{description}</CardDescription>
      </CardContent>
    </Card>
  );
}

export default function PremiumPage() {
  return (
    <div className="container mx-auto py-8 space-y-10">
      <div className="text-center">
        <Gem className="h-16 w-16 text-primary mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-foreground">Unlock SahaAcharya Premium</h1>
        <p className="text-muted-foreground text-lg mt-2 max-w-2xl mx-auto">
          Supercharge your learning and teaching journey with our exclusive premium features.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <PremiumFeatureCard
          icon={<BrainCircuit className="h-12 w-12 text-accent" />}
          title="AI-Powered Skill Validation"
          description="Get your skills validated by AI and receive advanced, personalized matching for optimal learning."
        />
        <PremiumFeatureCard
          icon={<MapPin className="h-12 w-12 text-accent" />}
          title="Nearby Peer Collaborators"
          description="Find and connect with motivated learners and teachers in your local area for in-person collaboration."
        />
        <PremiumFeatureCard
          icon={<DollarSign className="h-12 w-12 text-accent" />}
          title="Become a Mentor & Earn"
          description="Offer your expertise as a premium mentor, set your rates, and earn by teaching others."
        />
        <PremiumFeatureCard
          icon={<Share2 className="h-12 w-12 text-accent" />}
          title="Exclusive Referral Program"
          description="Refer friends to SahaAcharya Premium and earn rewards, tokens, and bonus features."
        />
        <PremiumFeatureCard
          icon={<ClipboardCheck className="h-12 w-12 text-accent" />}
          title="Mock Interview Practice"
          description="Access and schedule mock interview sessions with experienced peers or AI to hone your skills."
        />
         <PremiumFeatureCard
          icon={<Sparkles className="h-12 w-12 text-accent" />}
          title="Early Access to New Features"
          description="Be the first to try out new tools, roadmaps, and platform enhancements as a premium member."
        />
      </div>

      <div className="text-center mt-12">
        <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-10 py-6" disabled>
          <Gem className="mr-2 h-5 w-5" /> Upgrade to Premium (Coming Soon!)
        </Button>
        <p className="text-muted-foreground mt-4">
          Or <Link href="/dashboard" className="text-primary hover:underline">continue with your current plan</Link>.
        </p>
      </div>
    </div>
  );
}
