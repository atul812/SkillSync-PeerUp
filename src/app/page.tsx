
"use client"; 

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Users, Lightbulb, Zap, Award, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext"; 

export default function LandingPage() {
  const { currentUserProfile, loading } = useAuth();

  const getStartedLink = loading ? "#" : currentUserProfile ? "/dashboard" : "/signin";
  
  const GetStartedButtonContent = () => {
    if (loading) {
      return <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Loading...</>;
    }
    return currentUserProfile ? "Go to Dashboard" : "Get Started";
  };
  
  const JoinButtonContent = () => {
    if (loading) {
      return <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Please wait...</>;
    }
    return <>Join SkillSync & PeerUp Today <Zap className="ml-2 h-5 w-5" /></>;
  };

  const SignUpButtonContent = () => {
     if (loading) {
      return <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Loading...</>;
    }
    return "Sign Up & Start Swapping"; 
  }


  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-primary text-primary-foreground py-6 shadow-md">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="flex items-center text-3xl font-bold">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8 text-accent mr-2">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2.5-8.5L12 14l2.5-2.5L17 14l-5-5-5 5z"/>
            </svg>
            SkillSync & PeerUp
          </Link>
          <nav>
            <Link href={getStartedLink} passHref>
              <Button variant="secondary" disabled={loading}>
                <GetStartedButtonContent />
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        <section className="py-16 md:py-24 bg-gradient-to-br from-primary/80 via-background to-background">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary-foreground drop-shadow-md">
              Unlock Your Potential. Share Your Skills.
            </h2>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-primary-foreground/90">
              SkillSync & PeerUp is a peer-to-peer learning platform where you can teach what you know and learn what you need, all within a supportive and gamified environment.
            </p>
            <Link href={getStartedLink} passHref>
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground" disabled={loading}>
                <JoinButtonContent />
              </Button>
            </Link>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-center mb-12 text-foreground">
              Why SkillSync & PeerUp?
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Users className="h-10 w-10 text-primary" />}
                title="Peer-to-Peer Learning"
                description="Connect with fellow students to exchange knowledge. Teach your strengths, learn your weaknesses."
              />
              <FeatureCard
                icon={<Lightbulb className="h-10 w-10 text-primary" />}
                title="Skill Barter System"
                description="No fees involved! Offer your skills in exchange for learning new ones from others in the community."
              />
              <FeatureCard
                icon={<Award className="h-10 w-10 text-primary" />}
                title="Gamified Experience"
                description="Stay motivated with streaks, tokens, and leaderboards. Make learning fun and engaging."
              />
              <FeatureCard
                icon={<CheckCircle className="h-10 w-10 text-primary" />}
                title="Structured Roadmaps"
                description="Access curated learning paths for popular skills like Data Structures & Algorithms."
              />
              <FeatureCard
                icon={<Zap className="h-10 w-10 text-primary" />}
                title="AI-Powered Matches"
                description="Our smart recommendation engine helps you find the perfect learning partners."
              />
               <FeatureCard
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M12 22a10 10 0 0 0-8.69-4.95"></path>
                    <path d="M4.24 14.76A10 10 0 0 0 12 22"></path>
                    <path d="M17 17H7"></path><path d="M17 14H7"></path>
                    <path d="M17 11H7"></path>
                    <path d="M12 2a10 10 0 0 0-7.76 4.24"></path>
                    <path d="M12 2a10 10 0 0 1 7.76 4.24"></path>
                  </svg>
                }
                title="Progress Tracking"
                description="Monitor your learning journey, take notes, and manage your personalized roadmap effectively."
              />
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-secondary">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-3xl font-bold mb-6 text-secondary-foreground">Ready to Level Up Your Skills?</h3>
            <p className="text-lg mb-8 max-w-xl mx-auto text-secondary-foreground/80">
              Join a vibrant community of learners and teachers. It's free, fun, and fulfilling!
            </p>
            <Link href={getStartedLink} passHref>
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground" disabled={loading}>
                <SignUpButtonContent />
              </Button>
            </Link>
             <div className="mt-12">
              <Image 
                src="https://placehold.co/800x400.png" 
                alt="Diverse students collaborating" 
                width={800} 
                height={400} 
                className="rounded-lg shadow-xl mx-auto"
                data-ai-hint="collaboration learning"
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-foreground text-background py-8 text-center">
        <div className="container mx-auto px-4">
          <p>&copy; {new Date().getFullYear()} SkillSync & PeerUp. All rights reserved.</p>
          <p className="text-sm text-muted-foreground">Empowering students through shared knowledge.</p>
        </div>
      </footer>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="items-center">
        {icon}
        <CardTitle className="mt-4 text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-center text-base">{description}</CardDescription>
      </CardContent>
    </Card>
  );
}
