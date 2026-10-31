"use client";

import React from "react";
import Link from "next/link";
import { useJournalData } from "@/context/JournalDataContext";
import { Sidebar } from "@/components/layout/Sidebar";
import { ShieldCheck, CheckCircle2, AlertTriangle, FileText } from "lucide-react";

export default function AcademicIntegrityPage() {
  const { ethics, settings } = useJournalData();

  return (
    <div className="w-full">
      <div className="grid grid-cols-12 gap-2.5 sm:gap-6">
        <div className="col-span-7 sm:col-span-8 space-y-4 sm:space-y-6">
          <article className="bg-white border border-gray-300 p-4 sm:p-6 shadow-xs text-xs sm:text-sm text-gray-800 leading-relaxed space-y-6">
            <h1 className="text-xl sm:text-2xl font-editorial font-bold text-[#111111] border-b border-gray-200 pb-2">
              Publication Ethics &amp; Integrity Charter
            </h1>

            <div className="p-4 bg-purple-50 rounded border border-purple-200 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[#700070] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#700070] block mb-1">
                  Institutional Publishing Standards for {settings.journalTitle}
                </strong>
                <p className="text-gray-700">
                  Published by <strong>{settings.publisher}</strong>, our journal adheres strictly to the highest ethical codes of international scholarly publication, double-blind peer review, and authentic scholarship.
                </p>
              </div>
            </div>

            <section className="space-y-2">
              <h2 className="font-editorial text-base font-bold text-[#700070]">
                1. Authorship &amp; Contributorship Criteria
              </h2>
              <p className="text-gray-700">
                {ethics.authorshipCriteria}
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-editorial text-base font-bold text-[#700070]">
                2. Peer Review Policy &amp; Impartiality
              </h2>
              <p className="text-gray-700">
                {ethics.peerReviewPolicy}
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-editorial text-base font-bold text-[#700070]">
                3. Anti-Plagiarism &amp; Research Integrity Protocol
              </h2>
              <p className="text-gray-700">
                {ethics.plagiarismProtocol} All submissions are screened using {settings.plagiarismTool}.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-editorial text-base font-bold text-[#700070]">
                4. Conflict of Interest Disclosure
              </h2>
              <p className="text-gray-700">
                {ethics.conflictOfInterest}
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-editorial text-base font-bold text-[#700070]">
                5. Retraction, Correction &amp; Errata Policy
              </h2>
              <p className="text-gray-700">
                {ethics.retractionPolicy}
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="font-editorial text-base font-bold text-[#700070]">
                6. Human &amp; Animal Research Ethics
              </h2>
              <p className="text-gray-700">
                {ethics.humanEthics}
              </p>
            </section>

            <div className="pt-4 border-t border-gray-200 flex items-center justify-between text-xs">
              <Link
                href="/submit"
                className="px-4 py-2 bg-[#700070] hover:bg-[#550055] text-white font-bold rounded"
              >
                Submit Manuscript
              </Link>
              <span className="text-gray-500">
                Editorial questions: <a href={`mailto:${settings.email}`} className="text-[#700070] font-mono font-bold hover:underline">{settings.email}</a>
              </span>
            </div>
          </article>
        </div>

        <div className="col-span-5 sm:col-span-4">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
