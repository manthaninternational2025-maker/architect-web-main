"use client";

import React from "react";

export function AcademicBookAnimation({ className = "" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* SVG Open Academic Book with Subtle Floating & Page Animation */}
      <svg
        viewBox="0 0 320 220"
        className="w-full max-w-[280px] h-auto drop-shadow-md select-none animate-book-float"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Soft Ambient Shadow Beneath Book */}
        <ellipse cx="160" cy="205" rx="120" ry="12" fill="#07162F" fillOpacity="0.12" />

        {/* Hardcover Outer Spine & Edges */}
        <path
          d="M20 170 C90 155 140 162 160 178 C180 162 230 155 300 170 L295 185 C225 170 175 177 160 190 C145 177 95 170 25 185 Z"
          fill="#07162F"
          stroke="#0D2346"
          strokeWidth="2"
        />

        {/* Bottom Page Layers (Stacked Volume Feel) */}
        <path
          d="M23 166 C90 152 140 158 158 174 L158 186 C140 170 90 164 23 178 Z"
          fill="#EFECE5"
        />
        <path
          d="M297 166 C230 152 180 158 162 174 L162 186 C180 170 230 164 297 178 Z"
          fill="#EFECE5"
        />

        {/* Left Book Page (Open) */}
        <path
          d="M30 60 C95 48 145 54 158 72 L158 174 C145 158 95 152 30 166 Z"
          fill="#FFFFFF"
          stroke="#E2DDD5"
          strokeWidth="1.5"
        />

        {/* Right Book Page (Open) */}
        <path
          d="M290 60 C225 48 175 54 162 72 L162 174 C175 158 225 152 290 166 Z"
          fill="#FDFCF9"
          stroke="#E2DDD5"
          strokeWidth="1.5"
        />

        {/* Gentle Flipping Central Page (Animated Flutter) */}
        <path
          d="M160 70 C145 50 100 52 45 68 L45 168 C100 152 145 150 160 170 Z"
          fill="#FFFFFF"
          fillOpacity="0.95"
          className="animate-page-flip origin-right"
          stroke="#E2DDD5"
          strokeWidth="1"
        />

        {/* Subtle Text Lines on Left Page */}
        <g stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" opacity="0.65">
          <line x1="50" y1="80" x2="135" y2="76" />
          <line x1="50" y1="94" x2="138" y2="90" />
          <line x1="50" y1="108" x2="132" y2="104" />
          <line x1="50" y1="122" x2="136" y2="118" />
          <line x1="50" y1="136" x2="110" y2="132" />
        </g>

        {/* Subtle Text Lines on Right Page */}
        <g stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" opacity="0.65">
          <line x1="185" y1="76" x2="270" y2="80" />
          <line x1="182" y1="90" x2="270" y2="94" />
          <line x1="185" y1="104" x2="265" y2="108" />
          <line x1="182" y1="118" x2="268" y2="122" />
          <line x1="185" y1="132" x2="235" y2="136" />
        </g>

        {/* Academic Ribbon Bookmark (Orange Brand Color) */}
        <path
          d="M157 72 C158 110 154 150 152 195 L160 188 L168 195 C166 150 162 110 163 72 Z"
          fill="#F4511E"
        />

        {/* Central Book Spine Shading */}
        <line x1="160" y1="72" x2="160" y2="175" stroke="#CBD5E1" strokeWidth="2" />

        {/* Scholarly Floating Particles / Knowledge Sparks */}
        <circle cx="90" cy="40" r="3" fill="#F4511E" className="animate-sparkle-1" />
        <circle cx="230" cy="35" r="2.5" fill="#07162F" className="animate-sparkle-2" />
        <circle cx="160" cy="25" r="3.5" fill="#F4511E" className="animate-sparkle-3" />
        
        {/* Floating Quill Accent */}
        <g className="animate-quill-sway" transform="translate(235, 15)">
          <path
            d="M5 45 C15 30 25 15 38 2 C32 15 28 28 20 42 C17 38 12 36 8 36 Z"
            fill="#07162F"
          />
          <path
            d="M38 2 C35 15 30 30 20 42 L18 48 L22 44 Z"
            fill="#F4511E"
          />
        </g>
      </svg>
    </div>
  );
}

export function AcademicScrollAnimation({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 160 160"
        className="w-24 h-24 drop-shadow-sm select-none animate-book-float"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Academic Stack of 3 Bound Research Volumes */}
        {/* Bottom Tome (Navy) */}
        <rect x="20" y="115" width="120" height="22" rx="3" fill="#07162F" stroke="#0D2346" strokeWidth="1.5" />
        <rect x="25" y="120" width="110" height="12" fill="#F7F4EE" />
        <line x1="45" y1="115" x2="45" y2="137" stroke="#F4511E" strokeWidth="3" />

        {/* Middle Tome (Orange) */}
        <rect x="28" y="90" width="105" height="20" rx="3" fill="#F4511E" stroke="#D84315" strokeWidth="1.5" />
        <rect x="33" y="94" width="95" height="11" fill="#FFFFFF" />
        <line x1="50" y1="90" x2="50" y2="110" stroke="#07162F" strokeWidth="2.5" />

        {/* Top Tome (Open Handbook) */}
        <rect x="38" y="68" width="85" height="18" rx="2" fill="#07162F" stroke="#0D2346" strokeWidth="1.5" />
        <rect x="42" y="72" width="77" height="10" fill="#EFECE5" />

        {/* Graduation Cap / Mortarboard on Top */}
        <polygon points="80,32 125,48 80,62 35,48" fill="#07162F" stroke="#0D2346" strokeWidth="1" />
        <polygon points="80,35 120,48 80,60 40,48" fill="#0D2346" />
        <rect x="62" y="52" width="36" height="12" rx="2" fill="#07162F" />
        <circle cx="80" cy="47" r="2.5" fill="#F4511E" />
        {/* Tassel */}
        <path d="M80 47 C95 49 105 55 110 68" stroke="#F4511E" strokeWidth="2" strokeLinecap="round" fill="none" />
        <circle cx="110" cy="69" r="2" fill="#F4511E" />
      </svg>
    </div>
  );
}
