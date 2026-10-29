"use client";

import React from "react";
import Link from "next/link";
import { useJournalData } from "@/context/JournalDataContext";

export function Masthead() {
  const { settings } = useJournalData();

  return (
    <div className="bg-white py-5 sm:py-7 px-4 text-center border-b border-gray-200">
      <Link href="/" className="inline-block group">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-editorial not-italic font-bold text-[#700070] tracking-tight leading-tight max-w-4xl">
            {settings.journalTitle}
          </h1>
          <p className="text-base sm:text-xl font-editorial not-italic font-bold text-[#700070] mt-1.5">
            (ISSN: {settings.issn})
          </p>
          <p className="text-[11px] font-sans text-gray-500 uppercase tracking-widest mt-1">
            Published by {settings.publisher} • Monthly Refereed Journal
          </p>
        </div>
      </Link>
    </div>
  );
}
