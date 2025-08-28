import React from 'react';

interface GamificationIllustrationProps {
  className?: string;
  width?: number;
  height?: number;
}

export function GamificationIllustration({ className = '', width = 200, height = 200 }: GamificationIllustrationProps) {
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
      
      {/* Trophy */}
      <path
        d="M160 120H240V160C240 182.091 222.091 200 200 200C177.909 200 160 182.091 160 160V120Z"
        fill="url(#gradientTrophy)"
        stroke="#F59E0B"
        strokeWidth="4"
      />
      
      {/* Trophy Base */}
      <rect x="180" y="200" width="40" height="20" fill="#F59E0B" />
      <rect x="170" y="220" width="60" height="10" rx="2" fill="#F59E0B" />
      
      {/* Trophy Handles */}
      <path
        d="M160 140C140 140 130 130 130 110C130 100 140 100 160 100"
        stroke="#F59E0B"
        strokeWidth="4"
        fill="none"
      />
      <path
        d="M240 140C260 140 270 130 270 110C270 100 260 100 240 100"
        stroke="#F59E0B"
        strokeWidth="4"
        fill="none"
      />
      
      {/* Stars */}
      <path
        d="M200 80L205 90L215 92L208 100L210 110L200 105L190 110L192 100L185 92L195 90L200 80Z"
        fill="#FBBF24"
        stroke="#F59E0B"
        strokeWidth="2"
      />
      
      <path
        d="M150 250L153 256L160 257L155 262L156 268L150 265L144 268L145 262L140 257L147 256L150 250Z"
        fill="#FBBF24"
        stroke="#F59E0B"
        strokeWidth="2"
      />
      
      <path
        d="M250 250L253 256L260 257L255 262L256 268L250 265L244 268L245 262L240 257L247 256L250 250Z"
        fill="#FBBF24"
        stroke="#F59E0B"
        strokeWidth="2"
      />
      
      {/* Badges */}
      <circle cx="120" cy="180" r="20" fill="url(#gradientBadge1)" stroke="#6366F1" strokeWidth="2" />
      <path
        d="M120 170L123 176L130 177L125 182L126 189L120 186L114 189L115 182L110 177L117 176L120 170Z"
        fill="white"
      />
      
      <circle cx="280" cy="180" r="20" fill="url(#gradientBadge2)" stroke="#EC4899" strokeWidth="2" />
      <path
        d="M280 170L283 176L290 177L285 182L286 189L280 186L274 189L275 182L270 177L277 176L280 170Z"
        fill="white"
      />
      
      {/* Progress Bar */}
      <rect x="120" y="280" width="160" height="20" rx="10" fill="#E5E7EB" />
      <rect x="120" y="280" width="100" height="20" rx="10" fill="url(#gradientProgress)" />
      
      {/* Level */}
      <circle cx="200" cy="320" r="25" fill="url(#gradientLevel)" stroke="#6366F1" strokeWidth="3" />
      <text x="200" y="325" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold">10</text>
      
      {/* Coins */}
      <circle cx="140" cy="230" r="15" fill="#FBBF24" stroke="#F59E0B" strokeWidth="2" />
      <text x="140" y="235" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">$</text>
      
      <circle cx="260" cy="230" r="15" fill="#FBBF24" stroke="#F59E0B" strokeWidth="2" />
      <text x="260" y="235" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">$</text>
      
      {/* Gradients */}
      <defs>
        <linearGradient id="gradientBg" x1="20" y1="20" x2="380" y2="380" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6366F1" />
          <stop offset="1" stopColor="#EC4899" />
        </linearGradient>
        <linearGradient id="gradientTrophy" x1="160" y1="120" x2="240" y2="200" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FBBF24" />
          <stop offset="1" stopColor="#F59E0B" />
        </linearGradient>
        <linearGradient id="gradientBadge1" x1="100" y1="160" x2="140" y2="200" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6366F1" />
          <stop offset="1" stopColor="#818CF8" />
        </linearGradient>
        <linearGradient id="gradientBadge2" x1="260" y1="160" x2="300" y2="200" gradientUnits="userSpaceOnUse">
          <stop stopColor="#EC4899" />
          <stop offset="1" stopColor="#F472B6" />
        </linearGradient>
        <linearGradient id="gradientProgress" x1="120" y1="280" x2="220" y2="300" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6366F1" />
          <stop offset="1" stopColor="#EC4899" />
        </linearGradient>
        <linearGradient id="gradientLevel" x1="175" y1="295" x2="225" y2="345" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6366F1" />
          <stop offset="1" stopColor="#EC4899" />
        </linearGradient>
      </defs>
    </svg>
  );
}