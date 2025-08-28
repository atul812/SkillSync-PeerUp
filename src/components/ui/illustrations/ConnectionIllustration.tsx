import React from 'react';

interface ConnectionIllustrationProps {
  className?: string;
  width?: number;
  height?: number;
}

export function ConnectionIllustration({ className = '', width = 200, height = 200 }: ConnectionIllustrationProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background Circle */}
      <circle cx="200" cy="200" r="180" fill="url(#gradientBg)" opacity="0.1" />
      
      {/* Person 1 */}
      <circle cx="120" cy="180" r="40" fill="url(#gradientPerson1)" />
      <circle cx="120" cy="140" r="20" fill="url(#gradientPerson1)" />
      
      {/* Person 2 */}
      <circle cx="280" cy="180" r="40" fill="url(#gradientPerson2)" />
      <circle cx="280" cy="140" r="20" fill="url(#gradientPerson2)" />
      
      {/* Connection Line */}
      <path
        d="M160 180C160 180 180 150 200 150C220 150 240 180 240 180"
        stroke="url(#gradientLine)"
        strokeWidth="4"
        strokeDasharray="8 4"
      />
      
      {/* Skill Bubbles */}
      <circle cx="180" cy="120" r="15" fill="#6366F1" opacity="0.8" />
      <text x="180" y="124" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">JS</text>
      
      <circle cx="220" cy="120" r="15" fill="#EC4899" opacity="0.8" />
      <text x="220" y="124" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">UI</text>
      
      <circle cx="160" cy="90" r="12" fill="#6366F1" opacity="0.6" />
      <text x="160" y="94" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">CSS</text>
      
      <circle cx="240" cy="90" r="12" fill="#EC4899" opacity="0.6" />
      <text x="240" y="94" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">UX</text>
      
      {/* Exchange Arrows */}
      <path
        d="M190 220L170 240L190 260"
        stroke="#6366F1"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M210 260L230 240L210 220"
        stroke="#EC4899"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Connection Stars */}
      <circle cx="200" cy="200" r="5" fill="#6366F1" />
      <circle cx="180" cy="210" r="3" fill="#EC4899" />
      <circle cx="220" cy="210" r="3" fill="#6366F1" />
      <circle cx="200" cy="280" r="4" fill="#EC4899" />
      
      {/* Gradients */}
      <defs>
        <linearGradient id="gradientBg" x1="20" y1="20" x2="380" y2="380" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6366F1" />
          <stop offset="1" stopColor="#EC4899" />
        </linearGradient>
        <linearGradient id="gradientPerson1" x1="80" y1="140" x2="160" y2="220" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6366F1" />
          <stop offset="1" stopColor="#818CF8" />
        </linearGradient>
        <linearGradient id="gradientPerson2" x1="240" y1="140" x2="320" y2="220" gradientUnits="userSpaceOnUse">
          <stop stopColor="#EC4899" />
          <stop offset="1" stopColor="#F472B6" />
        </linearGradient>
        <linearGradient id="gradientLine" x1="160" y1="150" x2="240" y2="180" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6366F1" />
          <stop offset="1" stopColor="#EC4899" />
        </linearGradient>
      </defs>
    </svg>
  );
}