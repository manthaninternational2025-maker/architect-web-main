"use client";

import React from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { companyInfo } from "@/data/companyInfo";
import { MessageSquare } from "lucide-react";

export function Masthead() {
  return (
    <div className="bg-sand-50 border-b border-sand-200 py-3 sm:py-5">
      <div className="academic-container">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo & Journal Masthead */}
          <div className="flex items-center gap-4 text-center sm:text-left">
            <Logo variant="masthead" />
            <div className="hidden md:block border-l border-sand-200 pl-4 space-y-0.5">
              <div className="text-[11px] font-mono font-bold text-orange-600 tracking-wider uppercase">
                An International Peer-Reviewed Academic Platform
              </div>
              <p className="text-xs text-academic-muted">
                ISSN: 3139-695X (Online) • Published by Impulse Research Work
              </p>
            </div>
          </div>

          {/* Quick Contact & WhatsApp Desk */}
          <div className="flex items-center gap-3">
            <a
              href={companyInfo.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded bg-navy-950 hover:bg-orange-600 text-white text-xs font-semibold tracking-wide transition-colors shadow-xs"
            >
              <MessageSquare className="w-3.5 h-3.5 text-orange-500" />
              <span>WhatsApp: {companyInfo.whatsapp}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
