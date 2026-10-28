"use client";

import React, { useState } from "react";
import Link from "next/link";
import { GraduationCap } from "lucide-react";

interface LogoProps {
  className?: string;
  variant?: "masthead" | "navbar" | "footer";
}

export function Logo({ className = "", variant = "masthead" }: LogoProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-3 group transition-opacity hover:opacity-95 ${className}`}
      aria-label="Impulse Research Work - Home"
    >
      {!imgError ? (
        variant === "footer" ? (
          /* Footer: Display official logo with pristine original colors inside clean card */
          <div className="bg-white p-2 rounded border border-navy-800 shadow-sm inline-block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/impulse-logo.png"
              alt="Impulse Research Work"
              className="h-14 sm:h-16 w-auto max-w-[200px] object-contain"
              onError={() => setImgError(true)}
            />
          </div>
        ) : variant === "navbar" ? (
          /* Navbar: Clean compact badge */
          <div className="bg-white px-2 py-1 rounded shadow-sm inline-block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/impulse-logo.png"
              alt="Impulse Research Work"
              className="h-10 sm:h-11 w-auto max-w-[150px] object-contain"
              onError={() => setImgError(true)}
            />
          </div>
        ) : (
          /* Masthead: Full prominence */
          <div className="bg-white p-2 rounded border border-sand-200 shadow-sm inline-block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/impulse-logo.png"
              alt="Impulse Research Work"
              className="h-20 sm:h-24 w-auto max-w-[220px] object-contain"
              onError={() => setImgError(true)}
            />
          </div>
        )
      ) : (
        /* Academic Typographic Fallback if logo cannot load */
        <div className="flex items-center gap-3">
          <div
            className={`flex items-center justify-center rounded border ${
              variant === "navbar"
                ? "w-9 h-9 bg-orange-500 border-orange-600 text-white"
                : variant === "footer"
                ? "w-10 h-10 bg-navy-800 border-navy-700 text-orange-500"
                : "w-12 h-12 bg-navy-950 border-navy-900 text-orange-500 shadow-sm"
            }`}
          >
            <GraduationCap className={variant === "navbar" ? "w-5 h-5" : "w-7 h-7"} />
          </div>
          <div className="flex flex-col">
            <span
              className={`font-editorial font-bold tracking-tight ${
                variant === "navbar"
                  ? "text-lg text-white"
                  : variant === "footer"
                  ? "text-xl text-white"
                  : "text-2xl text-navy-950"
              }`}
            >
              Impulse Research Work
            </span>
            <span
              className={`text-[10px] uppercase tracking-widest font-medium ${
                variant === "navbar" || variant === "footer"
                  ? "text-gray-300"
                  : "text-orange-600"
              }`}
            >
              Academic Consultancy &amp; Editorial
            </span>
          </div>
        </div>
      )}
    </Link>
  );
}
