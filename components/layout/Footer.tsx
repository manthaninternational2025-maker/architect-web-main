"use client";

import React from "react";
import { useJournalData } from "@/context/JournalDataContext";
import { companyInfo } from "@/data/companyInfo";

export function Footer() {
  const { settings } = useJournalData();

  const title = settings?.journalTitle || companyInfo.journalTitle;
  const year = settings?.startingYear || "2026";

  return (
    <footer className="bg-[#222222] text-white py-2.5 px-3 sm:px-5 mt-6 border-t border-black">
      <div className="w-full text-xs sm:text-[13px]">
        {/* Journal Title & Copyright Year */}
        <p className="font-bold text-white tracking-normal text-center sm:text-left">
          {title} &copy; {year}
        </p>
      </div>
    </footer>
  );
}
