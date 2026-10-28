"use client";

import React from "react";
import Link from "next/link";

export function Masthead() {
  return (
    <div className="bg-white py-6 sm:py-8 px-4 text-center border-b border-gray-200">
      <Link href="/" className="inline-block group">
        <div className="flex flex-col items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/impulse-logo.png"
            alt="Impulse Research Work"
            className="h-10 sm:h-12 w-auto object-contain mb-2"
          />
          <h1 className="text-2xl sm:text-4xl md:text-[38px] font-editorial italic font-bold text-[#700070] tracking-tight leading-tight">
            Journal of Academic &amp; Multidisciplinary Research
          </h1>
          <p className="text-base sm:text-xl font-editorial font-bold text-[#700070] mt-1.5">
            (ISSN: 3139-695X)
          </p>
        </div>
      </Link>
    </div>
  );
}
