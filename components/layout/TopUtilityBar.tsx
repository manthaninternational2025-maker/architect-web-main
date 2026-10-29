"use client";

import React from "react";
import Link from "next/link";
import { companyInfo } from "@/data/companyInfo";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { ShieldCheck, LogIn, LogOut, UserCheck } from "lucide-react";

export function TopUtilityBar() {
  const { isAuthenticated, adminUser, openAuthModal, logout } = useAdminAuth();

  return (
    <aside aria-label="Journal Top Banner" className="bg-[#111111] text-white text-xs border-b border-black">
      <div className="w-full px-3 py-1.5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center flex-wrap gap-1.5 text-[11px] sm:text-xs">
          <span className="font-bold text-[#FFCC00] tracking-wide">
            {companyInfo.journalTitle}
          </span>
          <span className="text-gray-300 hidden md:inline">|</span>
          <span className="text-gray-200">
            {companyInfo.tagline}
          </span>
        </div>

        <div className="flex items-center gap-3 text-[11px] font-sans">
          <span className="text-gray-400 font-mono hidden sm:inline">
            (ISSN: {companyInfo.issn})
          </span>
          <span className="text-gray-500 hidden sm:inline">|</span>

          {isAuthenticated ? (
            <div className="flex items-center gap-2.5">
              <Link
                href="/admin"
                className="flex items-center gap-1 text-[#FFCC00] hover:underline font-semibold"
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Admin Panel ({adminUser?.username || "admin"})</span>
              </Link>
              <span className="text-gray-600">|</span>
              <button
                type="button"
                onClick={logout}
                className="flex items-center gap-1 text-gray-300 hover:text-red-400 transition-colors cursor-pointer"
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
                className="flex items-center gap-1 text-gray-200 hover:text-[#FFCC00] transition-colors cursor-pointer"
              >
                <LogIn className="w-3 h-3 text-[#FFCC00]" />
                <span>Admin Login</span>
              </button>
              <span className="text-gray-500">|</span>
              <button
                type="button"
                onClick={() => openAuthModal("signup")}
                className="text-gray-300 hover:text-[#FFCC00] transition-colors cursor-pointer"
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
