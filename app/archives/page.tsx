import React from "react";
import Link from "next/link";
import { Sidebar } from "@/components/layout/Sidebar";
import { BookOpen, Calendar, FileText } from "lucide-react";

export const metadata = {
  title: "Archives | Impulse Research Work",
  description: "Browse past issues, volumes, and scholarly publications of Impulse Research Work.",
};

export default function ArchivesPage() {
  const issues = [
    {
      volume: "Vol. 1 No. 1 (2026)",
      title: "Volume 1 Issue 1 Jan-Mar 2026",
      date: "Published: 2026-02-15",
      articlesCount: "5 Articles",
      href: "/current",
    },
    {
      volume: "Vol. 1 Supplement (2025)",
      title: "Methodological Monographs in Doctoral Research",
      date: "Published: 2025-11-20",
      articlesCount: "4 Monograph Guides",
      href: "/resources",
    },
  ];

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          <h1 className="text-xl sm:text-2xl font-editorial font-bold text-[#111111] border-b border-gray-200 pb-2">
            Archives
          </h1>

          <div className="space-y-4">
            {issues.map((iss, idx) => (
              <div key={idx} className="p-4 border border-gray-300 hover:border-[#700070] transition-colors bg-white">
                <h2 className="font-editorial text-base font-bold text-gray-900 hover:text-[#700070] mb-1">
                  <Link href={iss.href}>
                    {iss.volume}: {iss.title}
                  </Link>
                </h2>
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
                  View Table of Contents →
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
