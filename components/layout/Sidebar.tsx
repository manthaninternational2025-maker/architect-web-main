"use client";

import React from "react";
import Link from "next/link";
import { companyInfo } from "@/data/companyInfo";
import { MessageSquare, FileText, Lock } from "lucide-react";

export function Sidebar() {
  const keywords = [
    "achievement motivation",
    "sports psychology",
    "organizational behavior",
    "intrinsic motivation",
    "extrinsic motivation",
    "mental toughness",
    "self-determination theory",
    "goal-setting theory",
    "stress management",
    "emotional control",
    "friendship quality",
    "psychological well-being",
    "positive psychology",
    "ai-enhanced elt",
    "second language acquisition",
    "spSS statistical modeling",
    "pls-sem analysis",
    "turnitin diagnostics",
  ];

  return (
    <aside className="space-y-6">
      {/* Block 1: Make a Submission (Exact OJS style) */}
      <div className="bg-white border border-sand-200 p-4 rounded shadow-xs">
        <Link
          href="/submit"
          className="w-full inline-block py-3 px-4 text-center font-bold text-xs uppercase tracking-wider rounded bg-navy-950 hover:bg-orange-600 text-white transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
        >
          Make a Submission
        </Link>
        <div className="mt-2 text-center">
          <a
            href={companyInfo.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] text-orange-600 hover:underline font-semibold inline-flex items-center gap-1"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>WhatsApp Quick Desk ({companyInfo.phone})</span>
          </a>
        </div>
      </div>

      {/* Block 2: Information (Exact OJS style) */}
      <div className="bg-white border border-sand-200 p-4 rounded shadow-xs">
        <h2 className="font-editorial text-base font-bold text-navy-950 border-b border-sand-200 pb-2 mb-3">
          Information
        </h2>
        <ul className="space-y-2 text-xs">
          <li>
            <Link
              href="/resources"
              className="text-navy-950 hover:text-orange-600 transition-colors"
            >
              For Readers
            </Link>
          </li>
          <li>
            <Link
              href="/instructions-to-authors"
              className="text-navy-950 hover:text-orange-600 transition-colors"
            >
              For Authors
            </Link>
          </li>
          <li>
            <Link
              href="/editorial-board"
              className="text-navy-950 hover:text-orange-600 transition-colors"
            >
              For Librarians &amp; Scholars
            </Link>
          </li>
        </ul>
      </div>

      {/* Block 3: Journal Cover & Scholarly Scroll (Exact OJS customblock-cover-image) */}
      <div className="bg-white border border-sand-200 p-4 rounded shadow-xs text-center">
        <h2 className="font-editorial text-xs font-bold text-academic-muted uppercase tracking-wider mb-2">
          Current Issue Cover
        </h2>
        <div className="p-4 bg-sand-50 rounded border border-sand-200 flex flex-col items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/impulse-logo.png"
            alt="Impulse Research Work Cover"
            className="w-32 h-auto object-contain mx-auto mb-2"
          />
          <div className="text-[11px] font-mono text-navy-950 font-bold">
            Vol. 1 No. 1 (2026)
          </div>
          <div className="text-[10px] text-academic-muted">
            ISSN: 3139-695X (Online)
          </div>
        </div>
      </div>

      {/* Block 4: Keywords Cloud (Exact OJS style) */}
      <div className="bg-white border border-sand-200 p-4 rounded shadow-xs">
        <h2 className="font-editorial text-base font-bold text-navy-950 border-b border-sand-200 pb-2 mb-3">
          Keywords
        </h2>
        <div className="flex flex-wrap gap-1.5">
          {keywords.map((kw, idx) => (
            <Link
              key={idx}
              href={`/archives?q=${encodeURIComponent(kw)}`}
              className="keyword-pill text-[11px] px-2 py-0.5 rounded bg-sand-50 hover:bg-orange-500 hover:text-white text-navy-950 border border-sand-200 cursor-pointer"
            >
              {kw}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
