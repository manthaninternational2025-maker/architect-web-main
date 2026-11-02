"use client";

import React from "react";
import Link from "next/link";
import { useJournalData } from "@/context/JournalDataContext";
import { Sidebar } from "@/components/layout/Sidebar";

export default function OpenAccessPage() {
  const { settings } = useJournalData();

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Open Access Policy (Matching Reference Screenshot 5) */}
        <div className="col-span-1 lg:col-span-8 text-xs sm:text-sm text-gray-800 space-y-4 leading-relaxed font-sans">
          <h1 className="text-xl sm:text-2xl font-editorial font-bold text-[#111111] border-b border-gray-200 pb-2">
            open access policy
          </h1>

          <p className="text-gray-800 text-justify">
            <strong>{settings.journalTitle}</strong> follows the open access standards for publication. Open access publishing model is a well-established publishing mode that implements immediate, worldwide, barrier-free access to the full text of research articles without any need of a subscription or subscription fee to the particular journal in which these articles are published.
          </p>

          <p className="text-gray-800 text-justify">
            In this model, the publication costs including article processing cost are usually covered by the author&apos;s institution or research funds or by the author(s) themselves. Open access charges replace subscription charges allow the publishers to make the article freely available to all interested readers to download and distribute the published article.
          </p>

          <div className="pt-4 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <Link
              href="/submit"
              className="w-full sm:w-auto text-center inline-flex items-center justify-center px-5 py-2.5 bg-[#700070] hover:bg-[#550055] text-white font-bold rounded transition-colors shadow-xs"
            >
              Submit Manuscript &rarr;
            </Link>
            <span className="text-gray-600">
              Editorial questions:{" "}
              <a href={`mailto:${settings.email}`} className="text-[#700070] font-mono font-bold hover:underline break-all">
                {settings.email}
              </a>
            </span>
          </div>
        </div>

        {/* Right Column: Sidebar */}
        <div className="col-span-1 lg:col-span-4">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
