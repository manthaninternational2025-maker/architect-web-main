"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useJournalData, ArticleItem } from "@/context/JournalDataContext";
import { Sidebar } from "@/components/layout/Sidebar";
import { ArticlePdfButton } from "@/components/ui/ArticlePdfButton";
import { ArticlePdfModal } from "@/components/ui/ArticlePdfModal";
import { FileText, Calendar, User, Mail, ArrowRight } from "lucide-react";

export default function CurrentPage() {
  const { articles, settings, issues } = useJournalData();
  const [activeModalArticle, setActiveModalArticle] = useState<ArticleItem | null>(null);

  // Published articles for the current issue
  const publishedArticles = articles.filter((a) => a.status === "Published");
  const currentIssue = issues.find((i) => i.status === "Published") || issues[0];

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-200 pb-2">
            <h1 className="text-xl sm:text-2xl font-editorial font-bold text-[#111111]">
              Current Issue
            </h1>
            <span className="text-xs bg-[#700070] text-white px-2.5 py-0.5 font-bold uppercase tracking-wider">
              Open Access
            </span>
          </div>

          <div className="text-sm font-editorial font-bold text-gray-900 mb-1">
            {currentIssue
              ? `${currentIssue.volume}, ${currentIssue.issue} (${currentIssue.period})`
              : "Volume 1, Issue 1 (August 2026)"}
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-500 font-mono mb-4 pb-2 border-b border-gray-200">
            <Calendar className="w-3.5 h-3.5 text-[#700070]" />
            <span>
              Published: {currentIssue?.publicationDate || "August 2026"} • {publishedArticles.length} Articles
            </span>
          </div>

          <h2 className="text-base font-editorial font-bold text-[#700070] mb-3">
            Articles in this Issue
          </h2>

          <div className="divide-y divide-gray-200">
            {publishedArticles.map((art) => (
              <div key={art.id} className="py-3.5 first:pt-0 last:pb-0">
                <h3 className="font-editorial text-sm sm:text-base font-bold text-gray-900 hover:text-[#700070] mb-1 leading-snug">
                  <Link href={`/resources/${(art.doi || String(art.id)).replace(/[^a-zA-Z0-9]/g, "-")}`}>
                    {art.title}
                  </Link>
                </h3>

                <div className="text-xs text-gray-600 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-gray-400" />
                    <span className="font-semibold text-gray-800">{art.authors}</span>
                    <span className="text-gray-400">•</span>
                    <span className="bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded text-[11px] font-mono">
                      {art.volume} {art.issue}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    {art.pages && (
                      <span className="font-mono text-[11px] text-gray-500">{art.pages}</span>
                    )}
                    <Link
                      href={`/resources/${(art.doi || String(art.id)).replace(/[^a-zA-Z0-9]/g, "-")}`}
                      className="px-2 py-0.5 border border-gray-300 text-gray-700 hover:border-[#700070] hover:text-[#700070] text-[11px] font-medium transition-colors"
                    >
                      Abstract
                    </Link>
                    <ArticlePdfButton article={art} settings={settings} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-3 border-t border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <Link
              href="/archives"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#700070] hover:underline uppercase tracking-wider group"
            >
              <span>Browse All Issues in Archive</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>

            <span className="text-xs text-gray-500">
              Email your manuscript:{" "}
              <a href={`mailto:${settings.email}`} className="font-mono text-[#700070] hover:underline">
                {settings.email}
              </a>
            </span>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4">
          <Sidebar />
        </div>
      </div>

      {activeModalArticle && (
        <ArticlePdfModal
          article={activeModalArticle}
          settings={settings}
          onClose={() => setActiveModalArticle(null)}
        />
      )}
    </div>
  );
}
