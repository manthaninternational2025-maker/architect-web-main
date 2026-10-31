"use client";

import React from "react";
import Link from "next/link";
import { useJournalData } from "@/context/JournalDataContext";
import { Sidebar } from "@/components/layout/Sidebar";
import { Calendar } from "lucide-react";

export default function ArchivesPage() {
  const { issues, settings } = useJournalData();

  return (
    <div className="w-full">
      <div className="grid grid-cols-12 gap-2.5 sm:gap-6">
        <div className="col-span-7 sm:col-span-8 space-y-3 sm:space-y-6">
          <h1 className="text-base sm:text-2xl font-editorial font-bold text-[#111111] border-b border-gray-200 pb-1.5 sm:pb-2">
            Archives
          </h1>

          <p className="text-[11px] sm:text-sm text-gray-700 leading-relaxed">
            All issues published by <strong>{settings.journalTitle} (ISSN: {settings.issn})</strong> are openly accessible and preserved in digital repositories for international scholarly inquiry.
          </p>

          <div className="space-y-3 sm:space-y-4">
            {issues.map((iss) => (
              <div key={iss.id} className="p-2.5 sm:p-4 border border-gray-300 hover:border-[#700070] transition-colors bg-white">
                <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                  <h2 className="font-editorial text-xs sm:text-base font-bold text-gray-900 hover:text-[#700070]">
                    <Link href={iss.status === "Published" ? "/current" : "/submit"}>
                      {iss.volume}, {iss.issue} ({iss.period})
                    </Link>
                  </h2>
                  <span className={`text-[9.5px] sm:text-[11px] font-bold px-1.5 py-0.5 ${iss.status === 'Published' ? 'bg-purple-100 text-[#700070]' : 'bg-amber-100 text-amber-800'}`}>
                    {iss.status}
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-gray-700 mb-1.5 leading-snug">{iss.theme}</p>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-[10px] sm:text-xs text-gray-500 font-mono mb-2">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#700070]" />
                    {iss.publicationDate || iss.period}
                  </span>
                  <span>• {iss.articlesCount || 0} Articles</span>
                </div>
                <Link
                  href={iss.status === 'Published' ? '/current' : '/submit'}
                  className="text-[10px] sm:text-xs font-semibold text-[#700070] hover:underline uppercase tracking-wider block"
                >
                  {iss.status === 'Published' ? 'View Table of Contents & PDF Articles →' : 'Submit Manuscript for this Issue →'}
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-5 sm:col-span-4">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
