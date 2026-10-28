import React from "react";
import Link from "next/link";
import { companyInfo } from "@/data/companyInfo";
import { resources } from "@/data/resources";
import { Sidebar } from "@/components/layout/Sidebar";
import { FileText, Calendar, User, Mail } from "lucide-react";

export const metadata = {
  title: "Current Issue | Volume 1, Issue 1 (August 2026)",
  description: "Browse the inaugural issue of Manthan: International Multidisciplinary Journal of Social Inquiry.",
};

export default function CurrentPage() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-8 space-y-4">
          <h1 className="text-xl sm:text-2xl font-editorial font-bold text-[#111111] border-b border-gray-200 pb-2">
            Current Issue
          </h1>

          <div className="text-sm font-editorial font-bold text-gray-900 mb-1">
            Volume 1, Issue 1 (August 2026)
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-500 font-mono mb-4 pb-2 border-b border-gray-200">
            <Calendar className="w-3.5 h-3.5 text-[#700070]" />
            <span>Published: August 2026 • 6 Articles</span>
          </div>

          <h2 className="text-base font-editorial font-bold text-[#700070] mb-3">
            Articles in this Issue
          </h2>

          <div className="divide-y divide-gray-200">
            {resources.map((art) => (
              <div key={art.slug} className="py-3.5 first:pt-0 last:pb-0">
                <h3 className="font-editorial text-sm sm:text-base font-bold text-gray-900 hover:text-[#700070] mb-1 leading-snug">
                  <Link href={`/resources/${art.slug}`}>
                    {art.title}
                  </Link>
                </h3>

                <div className="text-xs text-gray-600 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-gray-400" />
                    <span className="font-semibold text-gray-800">{art.author}</span>
                    <span className="text-gray-400">•</span>
                    <span className="bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded text-[11px] font-mono">{art.volume} {art.issue}</span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-[11px] text-gray-500">{art.pages}</span>
                    <Link
                      href={`/resources/${art.slug}`}
                      className="px-2 py-0.5 border border-gray-300 text-gray-700 hover:border-[#700070] hover:text-[#700070] text-[11px] font-medium transition-colors"
                    >
                      Abstract
                    </Link>
                    <Link
                      href={`/resources/${art.slug}`}
                      className="px-2.5 py-0.5 border border-[#700070] text-[#700070] hover:bg-[#700070] hover:text-white text-[11px] font-mono font-bold tracking-wider transition-colors inline-flex items-center gap-1"
                    >
                      <FileText className="w-3 h-3 text-[#700070]" />
                      <span>PDF</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-3 border-t border-gray-200 flex items-center justify-between">
            <Link
              href="/archives"
              className="text-xs font-bold text-[#700070] hover:underline uppercase tracking-wider"
            >
              Browse All Issues in Archive &rarr;
            </Link>

            <span className="text-xs text-gray-500">
              Email your manuscript: <a href={`mailto:${companyInfo.email}`} className="font-mono text-[#700070] hover:underline">{companyInfo.email}</a>
            </span>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
