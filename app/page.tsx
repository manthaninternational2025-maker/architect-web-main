"use client";

import React from "react";
import Link from "next/link";
import { useJournalData } from "@/context/JournalDataContext";
import { Sidebar } from "@/components/layout/Sidebar";
import { SpecTable } from "@/components/ui/SpecTable";
import { FileText, Calendar, User, ArrowRight, Bell, Mail } from "lucide-react";

export default function HomePage() {
  const { settings, announcement, homepage, articles } = useJournalData();

  // Published articles for public display
  const publishedArticles = articles.filter((a) => a.status === "Published");

  return (
    <div className="w-full space-y-4">
      {/* -------------------------------------------------------------
          CALL FOR PAPERS ANNOUNCEMENT BANNER (From JournalDataContext)
         ------------------------------------------------------------- */}
      {announcement.active && (
        <div className="bg-purple-50 border border-purple-200 p-3 rounded-none flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#700070] shrink-0 animate-bounce" />
            <span className="font-bold text-[#700070]">{announcement.badge}:</span>
            <span className="text-gray-800">{announcement.text}</span>
          </div>
          <a
            href={`mailto:${announcement.contactEmail || settings.email}`}
            className="inline-flex items-center gap-1 font-bold text-[#700070] hover:underline shrink-0 bg-white px-2.5 py-1 border border-purple-200"
          >
            <Mail className="w-3.5 h-3.5 text-[#700070]" />
            <span>{announcement.contactEmail || settings.email}</span>
          </a>
        </div>
      )}


      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* -------------------------------------------------------------
            LEFT COLUMN (Main Content Area — Exactly like Reference)
           ------------------------------------------------------------- */}
        <div className="lg:col-span-8 space-y-4">
          <h1 className="text-xl sm:text-2xl font-editorial font-bold text-[#111111] border-b border-gray-200 pb-2">
            Home
          </h1>

          <p className="text-xs sm:text-sm text-justify text-gray-800 leading-relaxed font-sans">
            <strong>{settings.journalTitle} (ISSN: {settings.issn})</strong> {homepage.introP1.replace(/^[^a-zA-Z0-9]+/, "")}
          </p>

          <p className="text-xs sm:text-sm text-justify text-gray-800 leading-relaxed font-sans">
            {homepage.introP2}
          </p>

          {/* Journal Particulars Table (Dynamic from Settings) */}
          <SpecTable />

          {/* -------------------------------------------------------------
              ABOUT THE JOURNAL (Dynamic from Homepage State)
             ------------------------------------------------------------- */}
          <section className="pt-2 space-y-2">
            <h2 className="text-base font-editorial font-bold text-[#700070] border-b border-gray-200 pb-1">
              About the Journal
            </h2>
            <p className="text-xs sm:text-sm text-justify text-gray-800 leading-relaxed font-sans">
              {homepage.aboutText}
            </p>
          </section>

          {/* -------------------------------------------------------------
              PUBLICATION POLICY (Dynamic from Homepage State)
             ------------------------------------------------------------- */}
          <section className="pt-3 space-y-2">
            <h2 className="text-base font-editorial font-bold text-[#700070] border-b border-gray-200 pb-1">
              Publication Policy
            </h2>

            <p className="text-xs sm:text-sm text-justify text-gray-800 leading-relaxed font-sans">
              {homepage.policyText}
            </p>

            <p className="text-xs sm:text-sm text-justify text-gray-800 leading-relaxed font-sans">
              Research involving human participants, animals, or any regulated organisms must comply with applicable Institutional, National, or International ethical guidelines. Where required, authors must obtain approval from an appropriate ethics committee and include a clear statement of ethical approval and compliance within the manuscript.
            </p>

            <p className="text-xs sm:text-sm text-justify text-gray-800 leading-relaxed font-sans">
              All research submitted to <strong>{settings.journalTitle}</strong> must be conducted within an appropriate ethical framework. If there is reason to believe that the research has not adhered to accepted ethical standards, the Editor-in-Chief, <strong>{settings.editorInChief}</strong>, and Editorial Board reserve the right to reject the manuscript.
            </p>

            <p className="text-xs sm:text-sm text-justify text-gray-800 leading-relaxed font-sans">
              All original research articles, review papers, case studies, short communications, and other eligible manuscript types submitted to <strong>{settings.journalTitle}</strong> undergo a rigorous peer review process conducted by qualified subject experts to ensure academic quality, originality, and integrity.
            </p>

            <p className="text-xs sm:text-sm text-justify text-gray-800 leading-relaxed font-sans">
              Authors must ensure that all text, tables, figures, illustrations, and other copyrighted materials reproduced from other sources are properly acknowledged and cited. The journal follows a strict policy against plagiarism, and all submitted manuscripts are screened using {settings.plagiarismTool}.
            </p>

            <p className="text-xs sm:text-sm text-justify text-gray-800 leading-relaxed font-sans italic text-gray-600">
              All rights relating to the publication, distribution, and archival of accepted articles are reserved by <strong>{settings.journalTitle}</strong>, published by <strong>{settings.publisher}</strong>, subject to the journal&apos;s Open Access and Copyright Policy.
            </p>
          </section>

          {/* -------------------------------------------------------------
              CURRENT ISSUE & AUTHENTIC LATEST ARTICLES (Live from Admin)
             ------------------------------------------------------------- */}
          <section id="homepageIssue" className="pt-6 border-t border-gray-300 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-200 pb-1.5">
              <h2 className="text-lg sm:text-xl font-editorial font-bold text-[#700070]">
                Latest Articles: Volume 1, Issue 1 (August 2026)
              </h2>
              <span className="text-xs bg-[#700070] text-white px-2 py-0.5 font-bold">
                Current Issue
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-500 font-mono pb-2 border-b border-gray-200">
              <span className="w-2 h-2 rounded-full bg-[#700070]" />
              <Calendar className="w-3.5 h-3.5 text-[#700070]" />
              <span>Published: August 2026 • {publishedArticles.length} Articles in Database</span>
            </div>

            <div className="divide-y divide-gray-200">
              {publishedArticles.map((art) => (
                <div
                  key={art.id}
                  className="py-3 px-2 rounded hover:bg-gray-50 transition-colors first:pt-2 last:pb-0"
                >
                  <h3 className="font-editorial text-sm sm:text-base font-bold text-gray-900 hover:text-[#700070] mb-1 leading-snug">
                    <Link href={`/resources/${art.doi.replace(/[^a-zA-Z0-9]/g, "-")}`}>
                      {art.title}
                    </Link>
                  </h3>

                  <div className="text-xs text-gray-600 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-gray-400" />
                      <span className="font-semibold text-gray-800">{art.authors}</span>
                      <span className="text-gray-400">•</span>
                      <span className="bg-gray-100 text-gray-700 px-1.5 py-0.2 rounded text-[11px] font-mono">
                        {art.volume} {art.issue}
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-[10px] text-gray-400">DOI: {art.doi}</span>
                      <Link
                        href={`/resources/${art.doi.replace(/[^a-zA-Z0-9]/g, "-")}`}
                        className="px-2 py-0.5 border border-gray-300 text-gray-700 hover:border-[#700070] hover:text-[#700070] text-[11px] font-medium transition-colors"
                      >
                        Abstract
                      </Link>
                      <a
                        href={art.fileData || art.pdfUrl || "/archives"}
                        target={art.fileData || art.pdfUrl ? "_blank" : undefined}
                        rel={art.fileData || art.pdfUrl ? "noopener noreferrer" : undefined}
                        download={art.fileName || undefined}
                        className="px-2 py-0.5 border border-[#700070] text-[#700070] hover:bg-[#700070] hover:text-white text-[11px] font-mono font-bold tracking-wider transition-all inline-flex items-center gap-1"
                        title={art.fileName ? `Download ${art.fileName}` : "View PDF Document"}
                      >
                        <FileText className="w-3 h-3 text-[#700070] group-hover:text-white" />
                        <span>{art.fileName ? "PDF / DOC" : "PDF"}</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-gray-200 flex items-center justify-between">
              <Link
                href="/archives"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#700070] hover:underline uppercase tracking-wider group"
              >
                <span>Browse All Archives</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>

              <span className="text-xs text-gray-500">
                Send your article on email:{" "}
                <a
                  href={`mailto:${settings.email}`}
                  className="font-mono text-[#700070] hover:underline"
                >
                  {settings.email}
                </a>
              </span>
            </div>
          </section>
        </div>

        {/* -------------------------------------------------------------
            RIGHT COLUMN (Sidebar — Dynamic from Admin)
           ------------------------------------------------------------- */}
        <div className="lg:col-span-4">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
