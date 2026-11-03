"use client";

import React from "react";
import { useJournalData } from "@/context/JournalDataContext";
import { Sidebar } from "@/components/layout/Sidebar";

export default function OpenAccessPage() {
  const { settings } = useJournalData();

  const journalTitle = settings?.journalTitle || "Manthan: International Multidisciplinary Journal of Social Inquiry";

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Content: Open Access Policy (Matching Reference Screenshot 2 Exactly) */}
        <div className="col-span-1 lg:col-span-8">
          <div className="border border-gray-400 bg-white p-5 sm:p-7 text-[#222222]">
            {/* Heading */}
            <h1 className="text-xl sm:text-2xl text-[#222222] font-normal mb-5">
              open access policy
            </h1>

            {/* Paragraph 1 */}
            <p className="leading-relaxed text-[#222222] text-xs sm:text-[13px] mb-4">
              <strong>{journalTitle}</strong> follows the open access standards for publication, Open access publishing model is a well- established publishing mode that implements immediate, worldwide, barrier-free access to the full text of research articles without any need of a subscription or subscription fee to the particular journal in which these articles are published.
            </p>

            {/* Paragraph 2 */}
            <p className="leading-relaxed text-[#222222] text-xs sm:text-[13px]">
              In this model, the publication costs including article processing cost are usually covered by the author&apos;s institution or research funds or by the author(s) themselves. Open access charges replace subscription charges allow the publishers to make the article freely available to all interested readers to download and distribute the published article.
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
