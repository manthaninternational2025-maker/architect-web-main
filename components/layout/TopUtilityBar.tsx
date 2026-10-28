"use client";

import React from "react";
import Link from "next/link";
import { companyInfo } from "@/data/companyInfo";

export function TopUtilityBar() {
  return (
    <aside aria-label="Portal Header Strip" className="bg-sand-100 text-academic-muted text-[11px] border-b border-sand-200">
      <div className="academic-container flex items-center justify-between py-1.5">
        <div className="flex items-center gap-4">
          <span className="font-mono font-semibold text-navy-950">
            ISSN: 3139-695X (Online)
          </span>
          <span className="hidden sm:inline text-gray-300">|</span>
          <span className="hidden sm:inline">
            Peer-Reviewed Open Access Portal
          </span>
        </div>

        <div className="flex items-center gap-4 text-navy-950 font-semibold uppercase tracking-wider text-[10px]">
          <Link href="/register" className="hover:text-orange-600 transition-colors">
            Register
          </Link>
          <span className="text-gray-300">|</span>
          <Link href="/login" className="hover:text-orange-600 transition-colors">
            Login
          </Link>
        </div>
      </div>
    </aside>
  );
}
