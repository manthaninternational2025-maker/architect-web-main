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
          CARD 2: COVER PAGE (Exact Reference Layout: Header Banner + Framed Cover Page)
         ------------------------------------------------------------- */}
      {sidebarConfig.showCoverBox && (
        <div className="bg-white border border-[#CCCCCC] overflow-hidden text-center shadow-xs">
          {/* Header Banner matching Reference Image */}
          <div className="bg-[#700070] text-white py-2 px-3 text-center border-b border-[#550055]">
            <h2 className="text-sm sm:text-base font-bold tracking-wide">
              {sidebarConfig.coverPageHeading || "Cover Page"}
            </h2>
          </div>

          {/* Framed Cover Page Image (Static, Non-Clickable Display) */}
          <div className="p-3 bg-white flex flex-col items-center">
            <div className="border border-gray-200 bg-gray-50/50 p-1.5 shadow-xs w-full max-w-[280px] rounded-xs select-none">
              <img
                src={sidebarConfig.coverImageUrl || "/images/manthan-cover-page.png"}
                alt="Manthan: International Multidisciplinary Journal of Social Inquiry - Cover Page"
                className="w-full h-auto object-contain block select-none pointer-events-none"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.includes("manthan-cover-page.png")) {
                    target.src = "/images/manthan-cover-page.png";
                  }
                }}
              />
            </div>
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
