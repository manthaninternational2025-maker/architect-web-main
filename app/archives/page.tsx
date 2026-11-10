"use client";

import React from "react";
import Link from "next/link";
import { useJournalData } from "@/context/JournalDataContext";
import { Sidebar } from "@/components/layout/Sidebar";
import { ArticlePdfButton } from "@/components/ui/ArticlePdfButton";
import { getArticleUrl } from "@/utils/articleHelper";
import { Calendar, User } from "lucide-react";

export default function ArchivesPage() {
  const { issues, settings, articles } = useJournalData();

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="col-span-1 lg:col-span-8 space-y-6">
          <h1 className="text-2xl font-editorial font-bold text-[#111111] border-b border-gray-200 pb-2">
            Archives
          </h1>

          <p className="text-sm text-gray-700 leading-relaxed">
            All issues published by <strong>{settings.journalTitle} (ISSN: {settings.issn})</strong> are openly accessible and preserved in digital repositories for international scholarly inquiry.
          </p>

          <div className="space-y-4">
            {issues.map((iss) => (
              <div key={iss.id} className="p-4 border border-gray-300 hover:border-[#700070] transition-colors bg-white">
                <div className="flex items-center justify-between mb-1">
                  <h2 className="font-editorial text-base font-bold text-gray-900 hover:text-[#700070]">
                    <Link href={iss.status === "Published" ? "/current" : "/submit"}>
                      {iss.volume}, {iss.issue} ({iss.period})
                    </Link>
                  </h2>
                  <span className={`text-[11px] font-bold px-2 py-0.5 ${iss.status === 'Published' ? 'bg-purple-100 text-[#700070]' : 'bg-amber-100 text-amber-800'}`}>
                    {iss.status}
                  </span>
                </div>
                <p className="text-xs text-gray-700 mb-2 leading-snug">{iss.theme}</p>
                <div className="flex items-center gap-4 text-xs text-gray-500 font-mono mb-2">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#700070]" />
                    Published: {iss.publicationDate || iss.period}
                  </span>
                  <span>
                    {(() => {
                      const matchingCount = articles.filter(
                        (a) =>
                          a.status === "Published" &&
                          a.volume?.toLowerCase().trim() === iss.volume?.toLowerCase().trim() &&
                          a.issue?.toLowerCase().trim() === iss.issue?.toLowerCase().trim()
                      ).length;
                      return matchingCount > 0 ? matchingCount : (iss.articlesCount || 0);
                    })()} Articles
                  </span>
                </div>
                <Link
                  href={iss.status === 'Published' ? '/current' : '/submit'}
                  className="text-xs font-semibold text-[#700070] hover:underline uppercase tracking-wider block mb-3"
                >
                  {iss.status === 'Published' ? 'View Table of Contents & PDF Articles →' : 'Submit Manuscript for this Issue →'}
                </Link>

                {iss.status === "Published" && (
                  <div className="pt-3 border-t border-gray-200 space-y-2.5">
                    <p className="text-xs font-bold text-[#700070] uppercase tracking-wider">
                      Articles in this Issue:
                    </p>
                    {articles
                      .filter(
                        (a) =>
                          a.status === "Published" &&
                          (!a.volume ||
                            a.volume.toLowerCase().trim() ===
                              iss.volume.toLowerCase().trim())
                      )
                      .map((art) => (
                        <div
                          key={art.id}
                          className="p-2.5 rounded bg-gray-50 border border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs hover:border-[#700070] transition-colors"
                        >
                          <div className="flex-1 min-w-0 pr-2">
                            <Link
                              href={getArticleUrl(art)}
                              className="font-bold text-gray-900 hover:text-[#700070] line-clamp-1"
                            >
                              {art.title}
                            </Link>
                            <span className="text-[11px] text-gray-500 font-mono">
                              {art.authors}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <Link
                              href={getArticleUrl(art)}
                              className="px-2 py-0.5 border border-gray-300 text-gray-700 hover:border-[#700070] hover:text-[#700070] text-[11px] font-medium transition-colors"
                            >
                              Abstract
                            </Link>
                            <ArticlePdfButton article={art} settings={settings} />
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-1 lg:col-span-4">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
