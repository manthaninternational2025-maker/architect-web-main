"use client";

import React from "react";
import Link from "next/link";
import { companyInfo } from "@/data/companyInfo";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { LogIn, LogOut, UserCheck } from "lucide-react";

export function TopUtilityBar() {
  const { isAuthenticated, adminUser, openAuthModal, logout } = useAdminAuth();

  return (
    <aside aria-label="Journal Top Banner" className="bg-[#111111] text-white border-b border-black">
      <div className="w-full px-3 py-1.5 flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5">
        {/* Left Side: Journal Title, Tagline, ISSN (Cleanly Aligned) */}
        <div className="flex items-center flex-wrap gap-1.5 text-[10.5px] sm:text-[11px] text-gray-300 font-sans leading-tight">
          <span className="font-bold text-[#FFCC00] tracking-wide">
            {companyInfo.journalTitle}
          </span>
          <span className="text-gray-500">|</span>
          <span className="text-gray-200">
            An Open Access Peer Reviewed Refereed Journal
          </span>
          <span className="text-gray-500">|</span>
          <span className="text-[#FFCC00] font-mono font-medium">
            (ISSN: {companyInfo.issn})
          </span>
          <span className="text-gray-500">|</span>
        </div>

        {/* Right Side: Admin Authentication Buttons (Strictly Right Aligned) */}
        <div className="flex items-center gap-2 text-[11px] font-sans ml-auto shrink-0">
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <Link
                href="/admin"
                className="flex items-center gap-1.5 text-[#FFCC00] hover:text-white bg-[#222222] hover:bg-[#333333] border border-[#FFCC00]/50 px-2.5 py-0.5 rounded text-[11px] font-semibold transition-colors"
              >
                <UserCheck className="w-3.5 h-3.5 text-[#FFCC00]" />
                <span>Admin Panel ({adminUser?.username || "admin"})</span>
              </Link>
              <span className="text-gray-600">|</span>
              <button
                type="button"
                onClick={logout}
                className="flex items-center gap-1 text-gray-300 hover:text-rose-400 text-[11px] transition-colors cursor-pointer"
                title="Logout from Admin Panel"
              >
                <LogOut className="w-3 h-3" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => openAuthModal("login")}
                className="flex items-center gap-1.5 text-[#FFCC00] hover:text-white bg-[#222222] hover:bg-[#333333] border border-gray-700 hover:border-[#FFCC00] px-2.5 py-0.5 rounded text-[11px] font-semibold transition-colors cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5 text-[#FFCC00]" />
                <span>Admin Login</span>
              </button>
              <span className="text-gray-600">|</span>
              <button
                type="button"
                onClick={() => openAuthModal("signup")}
                className="text-gray-300 hover:text-[#FFCC00] text-[11px] font-medium transition-colors cursor-pointer"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
