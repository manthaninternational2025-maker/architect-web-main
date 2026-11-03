"use client";

import React from "react";
import { useJournalData } from "@/context/JournalDataContext";
import { Sidebar } from "@/components/layout/Sidebar";

export default function PlagiarismPage() {
  const { settings } = useJournalData();

  const journalTitle = settings?.journalTitle || "Manthan: International Multidisciplinary Journal of Social Inquiry";

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Content: Plagiarism Box (Matching Reference Screenshot 2 Exactly) */}
        <div className="col-span-1 lg:col-span-8">
          <div className="border border-gray-400 bg-white p-5 sm:p-7 text-[#222222]">
            {/* Heading */}
            <h1 className="text-xl sm:text-2xl text-[#222222] font-normal mb-5">
              plagiarism
            </h1>

            {/* Paragraph 1 */}
            <p className="leading-relaxed text-[#222222] text-xs sm:text-[13px] mb-4">
              Plagiarism is a serious issue now a day around the world in the arena of manuscript writing. Plagiarism means &ldquo;Use or close imitation of the language and thoughts of another author and the representation of them as one&rsquo;s own original work.&rdquo; It has been noticed that, authors are simply copying scientific data and information from the other published papers, which is unlawful practice in academic fraternity. Therefore, it is requested to the all authors to adopt the holistic &amp; pragmatic approach to design the manuscript of interest. <strong>{journalTitle}</strong> uses plagiarism software for the purpose.
            </p>

            {/* Paragraph 2 */}
            <p className="leading-relaxed text-[#222222] text-xs sm:text-[13px]">
              <strong>{journalTitle}</strong> will not be responsible for further action on Plagiarism issue. The author will be solely responsible for plagiarism issue.
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="col-span-1 lg:col-span-4">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
