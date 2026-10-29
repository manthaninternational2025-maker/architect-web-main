"use client";

import React from "react";
import Link from "next/link";
import { useJournalData } from "@/context/JournalDataContext";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { LogIn, LogOut, UserCheck } from "lucide-react";

export function TopUtilityBar() {
  const { isAuthenticated, openAuthModal, logout } = useAdminAuth();
  const { settings } = useJournalData();

  return (
    <aside aria-label="Journal Top Banner" className="bg-[#111111] text-white border-b border-black">
      <div className="w-full px-2.5 sm:px-3 py-1 sm:py-1.5 flex items-center justify-between gap-2 overflow-hidden">
        {/* Left Side: Journal Title, Tagline, ISSN (Cleanly Aligned & Responsive) */}
        <div className="flex items-center min-w-0 overflow-hidden text-[10.5px] sm:text-[11px] text-gray-300 font-sans leading-tight">
          <span className="font-bold text-[#FFCC00] tracking-wide whitespace-nowrap shrink-0">
            {settings.journalTitle}
          </span>
          <span className="hidden xl:inline text-gray-500 mx-1.5 shrink-0">|</span>
          <span className="hidden xl:inline text-gray-200 whitespace-nowrap shrink-0">
            An Open Access Peer Reviewed Refereed Journal
          </span>
          <span className="text-gray-500 mx-1.5 shrink-0">|</span>
          <span className="text-[#FFCC00] font-mono font-medium whitespace-nowrap shrink-0">
            (ISSN: {settings.issn})
          </span>
          <span className="text-gray-500 ml-1.5 shrink-0 hidden sm:inline">|</span>
        </div>

        {/* Right Side: Admin Authentication Buttons (Strictly Right Aligned & Uniform Width) */}
        <div className="flex items-center gap-1.5 sm:gap-2 text-[10.5px] sm:text-[11px] font-sans ml-auto shrink-0">
          {isAuthenticated ? (
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Link
                href="/admin"
                className="flex items-center gap-1 text-[#FFCC00] hover:text-white bg-[#222222] hover:bg-[#333333] border border-[#FFD700]/50 px-2 sm:px-2.5 py-0.5 rounded text-[10.5px] sm:text-[11px] font-semibold transition-colors"
                title="Open Admin Panel"
              >
                <UserCheck className="w-3.5 h-3.5 text-[#FFD700]" />
                <span>Admin Panel</span>
              </Link>
              <span className="text-gray-600">|</span>
              <button
                type="button"
                onClick={logout}
                className="flex items-center gap-1 text-gray-300 hover:text-rose-400 text-[10.5px] sm:text-[11px] transition-colors cursor-pointer"
                title="Logout from Admin Panel"
              >
                <LogOut className="w-3 h-3" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => openAuthModal("login")}
                className="flex items-center gap-1 text-[#FFCC00] hover:text-white bg-[#222222] hover:bg-[#333333] border border-gray-700 hover:border-[#FFCC00] px-2 sm:px-2.5 py-0.5 rounded text-[10.5px] sm:text-[11px] font-semibold transition-colors cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5 text-[#FFCC00]" />
                <span>Admin Login</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
