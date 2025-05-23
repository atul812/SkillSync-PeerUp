
import type { UserProfile, LearningRoadmap, LeaderboardEntry, SkillMatch } from "@/types";

export const mockUserProfile: UserProfile = {
  id: "user123",
  name: "Alex Johnson",
  bio: "Enthusiastic full-stack developer eager to learn new technologies and share my knowledge in Python and JavaScript.",
  avatarUrl: "https://placehold.co/100x100.png",
  skillsToTeach: ["Python", "JavaScript", "React"],
  skillsToLearn: ["Data Structures", "System Design", "Advanced SQL"],
  tokens: 150,
  streak: 12,
  personalNotes: {
    "Data Structures": "Need to focus on trees and graphs.",
  }
};

export const mockLearningRoadmap: LearningRoadmap = {
  id: "dsa101",
  title: "Data Structures & Algorithms",
  description: "A comprehensive roadmap to master DSA concepts.",
  steps: [
    { id: "step1", title: "Arrays and Strings", description: "Basics of arrays and string manipulations.", resources: [{name: "GeeksForGeeks - Arrays", url:"#"}], isCompleted: true },
    { id: "step2", title: "Linked Lists", description: "Understanding singly and doubly linked lists.", resources: [{name: "TutorialsPoint - Linked Lists", url:"#"}], isCompleted: false },
    { id: "step3", title: "Trees and Graphs", description: "Binary trees, BSTs, and graph algorithms.", resources: [{name: "Khan Academy - Trees", url:"#"}], isCompleted: false },
  ],
};

export const mockLeaderboard: LeaderboardEntry[] = [
  { rank: 1, userId: "user456", name: "Bella Hadid", avatarUrl: "https://placehold.co/40x40.png", score: 2500 },
  { rank: 2, userId: "user789", name: "Chris Evans", avatarUrl: "https://placehold.co/40x40.png", score: 2300 },
  { rank: 3, userId: "user123", name: "Alex Johnson", avatarUrl: "https://placehold.co/40x40.png", score: 2250 },
  { rank: 4, userId: "user101", name: "Diana Prince", avatarUrl: "https://placehold.co/40x40.png", score: 2100 },
  { rank: 5, userId: "user112", name: "Ethan Hunt", avatarUrl: "https://placehold.co/40x40.png", score: 1950 },
];

export const mockSkillMatches: SkillMatch[] = [
    {
        userId: "user_jane_doe",
        name: "Jane Doe",
        avatarUrl: "https://placehold.co/80x80.png",
        commonSkillsToTeach: ["Data Structures", "System Design"],
        commonSkillsToLearn: ["Python"],
        reasoning: "Jane is looking to learn Python, which you can teach. You want to learn Data Structures and System Design, which Jane is proficient in."
    },
    {
        userId: "user_john_smith",
        name: "John Smith",
        avatarUrl: "https://placehold.co/80x80.png",
        commonSkillsToTeach: ["Advanced SQL"],
        commonSkillsToLearn: ["React", "JavaScript"],
        reasoning: "John can help you with Advanced SQL. You can help John improve his React and JavaScript skills."
    }
];

export const availableSkills: string[] = [
  "JavaScript", "Python", "Java", "C++", "C#", "Ruby", "Go", "Swift", "Kotlin", "PHP",
  "HTML", "CSS", "React", "Angular", "Vue.js", "Node.js", "Django", "Flask", "Spring Boot",
  "SQL", "NoSQL", "MongoDB", "PostgreSQL", "MySQL", "Firebase", "AWS", "Azure", "Google Cloud",
  "Docker", "Kubernetes", "Terraform", "Git", "Agile", "Scrum", "Data Analysis", "Machine Learning",
  "Deep Learning", "Natural Language Processing", "Computer Vision", "Data Structures", "Algorithms",
  "System Design", "Cybersecurity", "Penetration Testing", "UI Design", "UX Design", "Figma",
  "Adobe XD", "Photoshop", "Illustrator", "Video Editing", "Content Writing", "SEO", "Digital Marketing",
  "Project Management", "Product Management", "Public Speaking", "Negotiation", "Leadership"
];
