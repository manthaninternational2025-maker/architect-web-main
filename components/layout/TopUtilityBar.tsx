"use client";

import React from "react";
import Link from "next/link";

export function TopUtilityBar() {
  return (
    <aside aria-label="Journal Top Banner" className="bg-[#111111] text-white text-xs border-b border-black">
      <div className="w-full px-3 py-1.5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center flex-wrap gap-1 text-[11px] sm:text-xs">
          <span className="font-bold text-[#FFCC00] tracking-wide">
            Impulse: Journal of Academic &amp; Multidisciplinary Research
          </span>
          <span className="text-gray-200">
            An Open Access Peer Reviewed Refereed Journal
          </span>
        </div>

        <div className="flex items-center gap-3 text-[11px] font-sans">
          <Link href="/register" className="text-gray-300 hover:text-[#FFCC00] transition-colors">
            Register
          </Link>
          <span className="text-gray-500">|</span>
          <Link href="/login" className="text-gray-300 hover:text-[#FFCC00] transition-colors">
            Login
          </Link>
        </div>
      </div>
    </aside>
  );
}
