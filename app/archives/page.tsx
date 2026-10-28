import React from "react";
import Link from "next/link";
import { companyInfo } from "@/data/companyInfo";
import { Sidebar } from "@/components/layout/Sidebar";
import { Calendar } from "lucide-react";

export const metadata = {
  title: "Archives | Manthan Journal",
  description: "Browse past issues, volumes, and scholarly publications of Manthan: International Multidisciplinary Journal of Social Inquiry.",
};

export default function ArchivesPage() {
  const issues = [
    {
      volume: "Volume 1, Issue 1 (August 2026)",
      title: "Inaugural Issue — Multidisciplinary Social Inquiry",
      date: "Published: August 2026",
      articlesCount: "6 Articles Published",
      status: "Published",
      href: "/current",
    },
    {
      volume: "Volume 1, Issue 2 (August 2026)",
      title: "Call for Papers — Submission Deadline: 15 August 2026",
      date: "Scheduled: August 2026",
      articlesCount: "Open for Submissions",
      status: "Call for Papers",
      href: "/submit",
    },
  ];

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          <h1 className="text-xl sm:text-2xl font-editorial font-bold text-[#111111] border-b border-gray-200 pb-2">
            Archives
          </h1>

          <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
            All issues published by <strong>{companyInfo.journalTitle} (ISSN: {companyInfo.issn})</strong> are openly accessible and preserved in digital repositories for international scholarly inquiry.
          </p>

          <div className="space-y-4">
            {issues.map((iss, idx) => (
              <div key={idx} className="p-4 border border-gray-300 hover:border-[#700070] transition-colors bg-white">
                <div className="flex items-center justify-between mb-1">
                  <h2 className="font-editorial text-base font-bold text-gray-900 hover:text-[#700070]">
                    <Link href={iss.href}>
                      {iss.volume}
                    </Link>
                  </h2>
                  <span className={`text-[11px] font-bold px-2 py-0.5 ${iss.status === 'Published' ? 'bg-purple-100 text-[#700070]' : 'bg-amber-100 text-amber-800'}`}>
                    {iss.status}
                  </span>
                </div>
                <p className="text-xs text-gray-700 mb-2">{iss.title}</p>
                <div className="flex items-center gap-4 text-xs text-gray-500 font-mono mb-2">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#700070]" />
                    {iss.date}
                  </span>
                  <span>{iss.articlesCount}</span>
                </div>
                <Link
                  href={iss.href}
                  className="text-xs font-semibold text-[#700070] hover:underline uppercase tracking-wider"
                >
                  {iss.status === 'Published' ? 'View Table of Contents & PDF Articles →' : 'Submit Manuscript for this Issue →'}
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
