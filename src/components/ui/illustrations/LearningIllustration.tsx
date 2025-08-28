import React from 'react';

interface LearningIllustrationProps {
  className?: string;
  width?: number;
  height?: number;
}

export function LearningIllustration({ className = '', width = 200, height = 200 }: LearningIllustrationProps) {
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
      
      {/* Book */}
      <path
        d="M120 140H280C285.523 140 290 144.477 290 150V270C290 275.523 285.523 280 280 280H120C114.477 280 110 275.523 110 270V150C110 144.477 114.477 140 120 140Z"
        fill="url(#gradientBook)"
        stroke="#6366F1"
        strokeWidth="4"
      />
      
      {/* Book Pages */}
      <path
        d="M200 140V280"
        stroke="#F9FAFB"
        strokeWidth="2"
        strokeDasharray="6 4"
      />
      
      {/* Book Lines */}
      <path d="M130 180H180" stroke="#F9FAFB" strokeWidth="2" />
      <path d="M130 200H180" stroke="#F9FAFB" strokeWidth="2" />
      <path d="M130 220H160" stroke="#F9FAFB" strokeWidth="2" />
      <path d="M220 180H270" stroke="#F9FAFB" strokeWidth="2" />
      <path d="M220 200H270" stroke="#F9FAFB" strokeWidth="2" />
      <path d="M220 220H250" stroke="#F9FAFB" strokeWidth="2" />
      
      {/* Lightbulb */}
      <circle cx="200" cy="100" r="30" fill="url(#gradientBulb)" />
      <path
        d="M190 130L190 150"
        stroke="#6366F1"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M210 130L210 150"
        stroke="#6366F1"
        strokeWidth="4"
        strokeLinecap="round"
      />
      
      {/* Rays */}
      <path
        d="M200 60L200 40"
        stroke="#EC4899"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M240 70L255 55"
        stroke="#EC4899"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M160 70L145 55"
        stroke="#EC4899"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M240 130L255 145"
        stroke="#EC4899"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M160 130L145 145"
        stroke="#EC4899"
        strokeWidth="4"
        strokeLinecap="round"
      />
      
      {/* Stars */}
      <circle cx="120" cy="80" r="5" fill="#EC4899" />
      <circle cx="280" cy="100" r="4" fill="#6366F1" />
      <circle cx="100" cy="200" r="3" fill="#6366F1" />
      <circle cx="300" cy="220" r="4" fill="#EC4899" />
      <circle cx="260" cy="300" r="5" fill="#6366F1" />
      <circle cx="140" cy="320" r="4" fill="#EC4899" />
      
      {/* Gradients */}
      <defs>
        <linearGradient id="gradientBg" x1="20" y1="20" x2="380" y2="380" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6366F1" />
          <stop offset="1" stopColor="#EC4899" />
        </linearGradient>
        <linearGradient id="gradientBook" x1="110" y1="140" x2="290" y2="280" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6366F1" stopOpacity="0.2" />
          <stop offset="1" stopColor="#EC4899" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id="gradientBulb" x1="170" y1="70" x2="230" y2="130" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6366F1" />
          <stop offset="1" stopColor="#EC4899" />
        </linearGradient>
      </defs>
    </svg>
  );
}