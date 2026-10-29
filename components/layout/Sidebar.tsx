"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useJournalData } from "@/context/JournalDataContext";

export function Sidebar() {
  const { sidebarConfig, settings } = useJournalData();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/archives?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <aside className="space-y-3.5 w-full">
      {/* -------------------------------------------------------------
          CARD 1: EDITORIAL POLICIES (Exact Reference Layout)
         ------------------------------------------------------------- */}
      {sidebarConfig.showEditorialPolicies && (
        <div className="bg-white border border-[#CCCCCC] p-3.5 text-center">
          <h2 className="text-base font-bold text-[#111111] mb-2.5 text-left border-b border-gray-200 pb-1">
            Editorial Policies
          </h2>
        <div className="flex flex-col space-y-2 py-1">
          <Link
            href="/academic-integrity"
            className="text-[#700070] hover:text-[#550055] font-bold text-sm tracking-wide transition-colors"
          >
            Publication Ethics
          </Link>
          <Link
            href="/peer-review-policy"
            className="text-[#700070] hover:text-[#550055] font-bold text-sm tracking-wide transition-colors"
          >
            Peer Review Process
          </Link>
          <Link
            href="/about"
            className="text-[#700070] hover:text-[#550055] font-bold text-sm tracking-wide transition-colors"
          >
            Open Access Policy
          </Link>
        </div>
      </div>
      )}

      {/* -------------------------------------------------------------
          CARD 2: JOURNAL COVER BOX (Solid Purple Box with White Frame)
         ------------------------------------------------------------- */}
      {sidebarConfig.showCoverBox && (
        <div className="bg-[#700070] border-2 border-white p-4 text-center text-white shadow-xs">
          <div className="border border-white/60 p-4 flex flex-col items-center justify-center min-h-[250px]">
            <h3 className="font-editorial not-italic font-bold text-lg leading-snug whitespace-pre-line">
              {sidebarConfig.coverBoxTitle || settings.journalTitle}
            </h3>
            <p className="font-editorial font-bold text-xs mt-2 tracking-wider">
              (ISSN: {settings.issn})
            </p>
            <div className="w-full border-t border-white/40 my-3" />
            <Link
              href="/"
              className="text-[11px] italic font-serif text-white hover:underline tracking-wider"
            >
              {sidebarConfig.coverBoxUrl || settings.website}
            </Link>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          CARD 3: MANUSCRIPT STATUS (Exact Reference Box)
         ------------------------------------------------------------- */}
      {sidebarConfig.showManuscriptStatus && (
        <div className="bg-white border border-[#CCCCCC] p-3 text-center transition-colors hover:bg-gray-50">
          <Link
            href={sidebarConfig.manuscriptStatusLink || "/submit"}
            className="block text-[#700070] hover:text-[#550055] font-bold text-sm sm:text-base tracking-wide"
          >
            {sidebarConfig.manuscriptStatusText || "Manuscript Status"}
          </Link>
        </div>
      )}

      {/* -------------------------------------------------------------
          CARD 4: CREATIVE COMMONS LICENSE (Exact Reference Box)
         ------------------------------------------------------------- */}
      {sidebarConfig.showCreativeCommons && (
        <div className="bg-white border border-[#CCCCCC] p-3 text-left">
          {/* CC Badge Icons */}
          <div className="flex items-center gap-1 mb-2">
            <div className="inline-flex items-center justify-center px-1.5 py-0.5 border border-gray-400 rounded text-[10px] font-bold bg-gray-100 text-gray-700">
              CC
            </div>
            <div className="inline-flex items-center justify-center px-1 py-0.5 border border-gray-400 rounded text-[10px] font-bold bg-gray-100 text-gray-700">
              BY
            </div>
            <div className="inline-flex items-center justify-center px-1 py-0.5 border border-gray-400 rounded text-[10px] font-bold bg-gray-100 text-gray-700">
              NC
            </div>
            <div className="inline-flex items-center justify-center px-1 py-0.5 border border-gray-400 rounded text-[10px] font-bold bg-gray-100 text-gray-700">
              SA
            </div>
          </div>

          <p className="text-[10px] sm:text-[11px] text-gray-700 leading-snug">
            <strong>{settings.journalTitle}</strong> by{" "}
            <strong className="text-[#700070]">{settings.publisher}</strong> is licensed under a{" "}
            <span className="text-[#700070] font-semibold">
              {sidebarConfig.ccLicenseText || "Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License"}
            </span>.
          </p>
          <p className="text-[10px] text-gray-600 mt-1">
            Based on a work at{" "}
            <a href="https://impulseresearchwork.com/" className="text-[#700070] hover:underline">
              https://impulseresearchwork.com/
            </a>.
          </p>
          <p className="text-[10px] text-gray-600 mt-0.5">
            Permissions beyond the scope of this license may be available at{" "}
            <a href="https://impulseresearchwork.com/" className="text-[#700070] hover:underline">
              https://impulseresearchwork.com/
            </a>.
          </p>
        </div>
      )}

      {/* -------------------------------------------------------------
          CARD 7: IMPACT FACTOR (Exact Reference Box)
         ------------------------------------------------------------- */}
      {sidebarConfig.showImpactFactor && (
        <div className="bg-white border border-[#CCCCCC] p-2 text-center">
          <span className="text-[#700070] font-bold text-xs sm:text-sm">
            {sidebarConfig.impactFactorValue || `Impact Factor: ${settings.impactFactor}`}
          </span>
        </div>
      )}

      {/* -------------------------------------------------------------
          CARD 8: SEARCH WIDGET (Exact Reference Box)
         ------------------------------------------------------------- */}
      {sidebarConfig.showSearchBar && (
        <div className="bg-white border border-[#CCCCCC] p-3 text-left">
          <label htmlFor="sidebar-search" className="block text-xs font-semibold text-gray-700 mb-1">
            Search
          </label>
          <form onSubmit={handleSearch} className="flex items-center gap-1.5">
            <input
              id="sidebar-search"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-2 py-1 text-xs border border-gray-400 focus:outline-none focus:border-[#700070] bg-white text-gray-900 rounded-none"
              placeholder=""
            />
            <button
              type="submit"
              className="px-3.5 py-1 text-xs font-bold text-white bg-[#333333] hover:bg-black transition-colors rounded-none"
            >
              Search
            </button>
          </form>
        </div>
      )}
    </aside>
  );
}
