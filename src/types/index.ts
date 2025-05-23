
export interface UserProfile {
  id: string; // For mock, this might be the email
  name: string;
  email?: string; // Added for mock auth check
  bio: string;
  avatarUrl?: string;
  skillsToTeach: string[];
  skillsToLearn: string[];
  tokens: number;
  streak: number;
  personalNotes?: Record<string, string>; // skill -> note
}

export interface SkillMatch {
  userId: string; // ID of the matched user
  name: string; // Name of the matched user
  avatarUrl?: string;
  commonSkillsToTeach: string[]; // Skills they can teach you
  commonSkillsToLearn: string[]; // Skills you can teach them
  reasoning: string;
}

export interface RoadmapStep {
  id: string;
  title: string;
  description: string;
  resources: { name: string, url: string }[];
  isCompleted: boolean;
}

export interface LearningRoadmap {
  id: string;
  title: string; // e.g., "Data Structures & Algorithms"
  description: string;
  steps: RoadmapStep[];
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  name: string;
  avatarUrl?: string;
  score: number; // Could be tokens, XP, or a combination
}

// For AI interaction
export interface AISkillMatchInput {
  teachingSkills: string[];
  learningSkills: string[];
  studentProfile?: string; // e.g. bio
}

export interface AISkillMatchOutput {
  recommendedMatches: string[]; // Names or IDs of recommended students
  reasoning: string;
}
