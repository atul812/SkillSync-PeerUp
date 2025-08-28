
"use client"; 

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Users, Lightbulb, Zap, Award, Loader2, ArrowUp, Twitter, Instagram, Linkedin } from "lucide-react";
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
    return <>Join SkillSync & PeerUp <Zap className="ml-2 h-5 w-5" /></>;
  };

  const SignUpButtonContent = () => {
     if (loading) {
      return <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Loading...</>;
    }
    return "Sign Up & Start Learning"; 
  }


  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-background border-b border-border py-4 sticky top-0 z-50 backdrop-blur-md bg-opacity-80">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="flex items-center text-3xl font-bold group">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-10 w-10 text-primary mr-2 group-hover:animate-pulse transition-all duration-300">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2.5-8.5L12 14l2.5-2.5L17 14l-5-5-5 5z"/>
            </svg>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent font-extrabold">SkillSync & PeerUp</span>
          </Link>
          <nav className="flex items-center space-x-4">
            <Link href="#features" className="text-foreground/80 hover:text-primary transition-colors duration-200 hidden md:block">Features</Link>
            <Link href="#how-it-works" className="text-foreground/80 hover:text-primary transition-colors duration-200 hidden md:block">How It Works</Link>
            <Link href={getStartedLink} passHref>
              <Button variant="default" size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300" disabled={loading}>
                <GetStartedButtonContent />
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 md:py-32 relative overflow-hidden" id="hero">
          {/* Background elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background z-0"></div>
          <div className="absolute top-20 right-10 w-64 h-64 bg-primary/20 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 left-10 w-72 h-72 bg-secondary/20 rounded-full filter blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="text-left md:w-1/2 animate-fade-in">
                <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-secondary">Unlock Your Potential.</span>
                  <br />
                  <span className="text-foreground">Share Your Skills.</span>
                </h1>
                <p className="text-xl mb-8 text-foreground/80 max-w-xl">
                  SkillSync & PeerUp is a peer-to-peer learning platform where you can teach what you know and learn what you need, all within a supportive and gamified environment.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href={getStartedLink} passHref>
                    <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 text-lg px-8 py-6" disabled={loading}>
                      <JoinButtonContent />
                    </Button>
                  </Link>
                  <Link href="#how-it-works" passHref>
                    <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10 transition-all duration-300 text-lg px-8 py-6">
                      Learn More
                    </Button>
                  </Link>
                </div>
                <div className="mt-8 flex items-center">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-muted flex items-center justify-center border-2 border-background text-xs font-bold">{i}</div>
                    ))}
                  </div>
                  <p className="ml-4 text-sm text-muted-foreground">Join <span className="text-primary font-bold">1,000+</span> students already on the platform</p>
                </div>
              </div>
              
              <div className="md:w-1/2 relative animate-fade-in" style={{animationDelay: '0.3s'}}>
                <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl p-1 shadow-xl">
                  <div className="bg-card rounded-xl overflow-hidden">
                    <Image 
                      src="https://placehold.co/600x400.png" 
                      alt="Students collaborating" 
                      width={600} 
                      height={400}
                      className="w-full h-auto object-cover"
                      data-ai-hint="diverse students collaborating on campus"
                    />
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground p-4 rounded-lg shadow-lg">
                  <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    <span className="font-bold">Peer Learning</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 md:py-32 bg-gradient-to-b from-background to-background/95" id="features">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-block bg-primary/10 text-primary font-medium rounded-full px-4 py-1.5 mb-4">Features</div>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
                Why Students <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Love</span> SkillSync & PeerUp
              </h2>
              <p className="text-xl text-foreground/70">
                Our platform is designed specifically for college students who want to maximize their learning potential through collaboration.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Users className="h-12 w-12 text-primary" />}
                title="Peer-to-Peer Learning"
                description="Connect with fellow students to exchange knowledge. Teach your strengths, learn your weaknesses."
                delay={0}
              />
              <FeatureCard
                icon={<Lightbulb className="h-12 w-12 text-secondary" />}
                title="Skill Barter System"
                description="No fees involved! Offer your skills in exchange for learning new ones from others in the community."
                delay={0.1}
              />
              <FeatureCard
                icon={<Award className="h-12 w-12 text-accent" />}
                title="Gamified Experience"
                description="Stay motivated with streaks, tokens, and leaderboards. Make learning fun and engaging."
                delay={0.2}
              />
              <FeatureCard
                icon={<CheckCircle className="h-12 w-12 text-secondary" />}
                title="Structured Roadmaps"
                description="Access curated learning paths for popular skills like Data Structures & Algorithms."
                delay={0.3}
              />
              <FeatureCard
                icon={<Zap className="h-12 w-12 text-primary" />}
                title="AI-Powered Matches"
                description="Our smart recommendation engine helps you find the perfect learning partners."
                delay={0.4}
              />
              <FeatureCard
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
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
                delay={0.5}
              />
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 md:py-32 relative" id="how-it-works">
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-primary/5 z-0"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-block bg-secondary/10 text-secondary font-medium rounded-full px-4 py-1.5 mb-4">How It Works</div>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
                Simple Steps to <span className="bg-clip-text text-transparent bg-gradient-to-r from-secondary to-primary">Start Learning</span>
              </h2>
              <p className="text-xl text-foreground/70">
                Our platform makes it easy to connect with peers and exchange knowledge
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="bg-card rounded-xl p-6 shadow-lg border border-border/50 relative animate-fade-in" style={{animationDelay: '0.1s'}}>
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">1</div>
                <h3 className="text-2xl font-bold mb-4 mt-4">Create Your Profile</h3>
                <p className="text-foreground/70">Sign up and list the skills you can teach and the ones you want to learn</p>
              </div>
              
              <div className="bg-card rounded-xl p-6 shadow-lg border border-border/50 relative animate-fade-in" style={{animationDelay: '0.2s'}}>
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-xl font-bold">2</div>
                <h3 className="text-2xl font-bold mb-4 mt-4">Match with Peers</h3>
                <p className="text-foreground/70">Our AI matches you with students who complement your skill set</p>
              </div>
              
              <div className="bg-card rounded-xl p-6 shadow-lg border border-border/50 relative animate-fade-in" style={{animationDelay: '0.3s'}}>
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-xl font-bold">3</div>
                <h3 className="text-2xl font-bold mb-4 mt-4">Exchange Knowledge</h3>
                <p className="text-foreground/70">Schedule sessions, track progress, and earn rewards as you learn and teach</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-primary/80 to-accent/80 rounded-2xl p-10 shadow-xl text-white text-center animate-fade-in" style={{animationDelay: '0.4s'}}>
              <h3 className="text-3xl font-bold mb-6">Ready to Level Up Your Skills?</h3>
              <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
                Join a vibrant community of learners and teachers. It's free, fun, and fulfilling!
              </p>
              <Link href={getStartedLink} passHref>
                <Button size="lg" className="bg-white hover:bg-white/90 text-primary hover:text-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 text-lg px-8 py-6" disabled={loading}>
                  <SignUpButtonContent />
                </Button>
              </Link>
              
              <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-left">
                  <p className="text-3xl font-bold">1000+</p>
                  <p className="text-sm">Active Students</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-left">
                  <p className="text-3xl font-bold">500+</p>
                  <p className="text-sm">Skills Exchanged</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-left">
                  <p className="text-3xl font-bold">50+</p>
                  <p className="text-sm">Universities</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-left">
                  <p className="text-3xl font-bold">4.8/5</p>
                  <p className="text-sm">User Rating</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Section */}
      <footer className="py-12 bg-background border-t border-border/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-accent mr-2 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S&P</span>
                </div>
                <h3 className="font-bold text-lg">SkillSync & PeerUp</h3>
              </div>
              <p className="text-sm text-foreground/70 mb-4">
                The ultimate peer-to-peer learning platform for college students.
              </p>
              <div className="flex space-x-3">
                <Link href="#" className="h-8 w-8 rounded-full bg-foreground/10 flex items-center justify-center hover:bg-primary/20 transition-colors">
                  <Twitter className="h-4 w-4" />
                </Link>
                <Link href="#" className="h-8 w-8 rounded-full bg-foreground/10 flex items-center justify-center hover:bg-primary/20 transition-colors">
                  <Instagram className="h-4 w-4" />
                </Link>
                <Link href="#" className="h-8 w-8 rounded-full bg-foreground/10 flex items-center justify-center hover:bg-primary/20 transition-colors">
                  <Linkedin className="h-4 w-4" />
                </Link>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Platform</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-sm text-foreground/70 hover:text-primary transition-colors">Dashboard</Link></li>
                <li><Link href="#" className="text-sm text-foreground/70 hover:text-primary transition-colors">Find Matches</Link></li>
                <li><Link href="#" className="text-sm text-foreground/70 hover:text-primary transition-colors">Learning Roadmap</Link></li>
                <li><Link href="#" className="text-sm text-foreground/70 hover:text-primary transition-colors">Leaderboard</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-sm text-foreground/70 hover:text-primary transition-colors">Help Center</Link></li>
                <li><Link href="#" className="text-sm text-foreground/70 hover:text-primary transition-colors">Community Guidelines</Link></li>
                <li><Link href="#" className="text-sm text-foreground/70 hover:text-primary transition-colors">Success Stories</Link></li>
                <li><Link href="#" className="text-sm text-foreground/70 hover:text-primary transition-colors">Blog</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link href="#" className="text-sm text-foreground/70 hover:text-primary transition-colors">Terms of Service</Link></li>
                <li><Link href="#" className="text-sm text-foreground/70 hover:text-primary transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="text-sm text-foreground/70 hover:text-primary transition-colors">Cookie Policy</Link></li>
                <li><Link href="#" className="text-sm text-foreground/70 hover:text-primary transition-colors">Contact Us</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-foreground/60 mb-4 md:mb-0">
              © {new Date().getFullYear()} SkillSync & PeerUp. All rights reserved.
            </p>
            <div className="flex items-center">
              <p className="text-xs text-foreground/60 mr-2">Made with 💜 for college students</p>
              <Button variant="ghost" size="sm" className="text-xs h-8">
                <ArrowUp className="h-3 w-3 mr-1" /> Back to top
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

function FeatureCard({ icon, title, description, delay = 0 }: FeatureCardProps) {
  return (
    <Card 
      className="shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-5px] border border-border/50 bg-card/50 backdrop-blur-sm animate-fade-in"
      style={{ animationDelay: `${delay}s` }}
    >
      <CardHeader className="items-center">
        <div className="p-3 rounded-full bg-primary/10 mb-4">
          {icon}
        </div>
        <CardTitle className="mt-2 text-2xl font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-center text-base text-foreground/70">{description}</CardDescription>
      </CardContent>
    </Card>
  );
}
