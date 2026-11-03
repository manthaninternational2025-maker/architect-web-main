"use client";

import React from "react";
import { useJournalData } from "@/context/JournalDataContext";
import { companyInfo } from "@/data/companyInfo";

export function Footer() {
  const { settings } = useJournalData();

  const title = settings?.journalTitle || companyInfo.journalTitle;
  const year = settings?.startingYear || "2026";

  return (
    <footer className="bg-[#222222] text-white py-2 sm:py-2.5 px-3 sm:px-5 mt-6 border-t border-black">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-1.5 w-full text-xs sm:text-[13px]">
        {/* Left: Journal Title & Copyright Year */}
        <p className="font-bold text-white tracking-normal text-center sm:text-left">
          {title} &copy; {year}
        </p>

        {/* Right: Theme / Credit matching reference screenshot */}
        <p className="text-gray-300 font-normal text-center sm:text-right text-[11px] sm:text-xs shrink-0">
          Frontier Theme
        </p>
      </div>
    </footer>
  );
}
