"use client";

import React from "react";
import Link from "next/link";
import { useJournalData } from "@/context/JournalDataContext";
import { Sidebar } from "@/components/layout/Sidebar";

export default function InstructionsToAuthorsPage() {
  const { instructions, settings } = useJournalData();

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 text-xs sm:text-sm text-gray-800 space-y-6 leading-relaxed">
          <h1 className="text-xl sm:text-2xl font-editorial font-bold text-[#111111] border-b border-gray-200 pb-2">
            Instructions to Authors
          </h1>

          <section className="space-y-2">
            <h2 className="font-editorial text-sm sm:text-base font-bold text-[#700070]">
              1. Manuscript Scope &amp; Focus
            </h2>
            <p className="text-gray-700">
              {instructions.manuscriptScope}
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-editorial text-sm sm:text-base font-bold text-[#700070]">
              2. Formatting &amp; Typography
            </h2>
            <p className="text-gray-700">
              {instructions.formattingFont}
            </p>
            <ul className="list-disc pl-5 space-y-1 text-gray-700 mt-2">
              <li><strong>Abstract Word Limit:</strong> {instructions.abstractWordLimit}</li>
              <li><strong>Keywords Requirement:</strong> {instructions.keywordsLimit}</li>
              <li><strong>Article Processing Charge (APC):</strong> {instructions.apcPolicy}</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-editorial text-sm sm:text-base font-bold text-[#700070]">
              3. Referencing Style &amp; Citations
            </h2>
            <p className="text-gray-700">
              {instructions.citationStyle}
            </p>
            <p className="text-gray-700 mt-1">
              Plagiarism threshold: <strong>{instructions.plagiarismThreshold}</strong> screened using {settings.plagiarismTool}.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-editorial text-sm sm:text-base font-bold text-[#700070]">
              4. Submission Checklist
            </h2>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              {instructions.checklistItems.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </section>

          <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
            <Link
              href="/submit"
              className="inline-block px-4 py-2 bg-[#700070] hover:bg-[#550055] text-white font-bold text-xs uppercase tracking-wider rounded transition-colors"
            >
              Submit Your Manuscript Now &rarr;
            </Link>

            <span className="text-xs text-gray-500">
              Email inquiries: <a href={`mailto:${settings.email}`} className="font-mono text-[#700070] hover:underline font-bold">{settings.email}</a>
            </span>
          </div>
        </div>

        <div className="lg:col-span-4">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
