import React from 'react';
import { IllustratedFeatureCard } from './IllustratedFeatureCard';
import { LearningIllustration } from '../ui/illustrations/LearningIllustration';
import { ConnectionIllustration } from '../ui/illustrations/ConnectionIllustration';
import { GamificationIllustration } from '../ui/illustrations/GamificationIllustration';

export function IllustratedFeatures() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <IllustratedFeatureCard
        title="Personalized Learning"
        description="Follow customized learning paths based on your skills and goals. Track your progress and celebrate milestones along the way."
        linkHref="/roadmap"
        linkText="View Your Roadmap"
        illustration={<LearningIllustration width={150} height={150} />}
        gradientFrom="from-primary"
        gradientTo="to-secondary"
      />
      
      <IllustratedFeatureCard
        title="Peer Connections"
        description="Connect with fellow students who complement your skills. Teach what you know and learn what you don't in a collaborative environment."
        linkHref="/matches"
        linkText="Find Your Matches"
        illustration={<ConnectionIllustration width={150} height={150} />}
        gradientFrom="from-secondary"
        gradientTo="to-accent"
      />
      
      <IllustratedFeatureCard
        title="Skill Achievements"
        description="Earn tokens, badges, and climb the leaderboard as you teach and learn. Showcase your accomplishments to the community."
        linkHref="/leaderboard"
        linkText="Check Leaderboard"
        illustration={<GamificationIllustration width={150} height={150} />}
        gradientFrom="from-accent"
        gradientTo="to-primary"
      />
    </div>
  );
}