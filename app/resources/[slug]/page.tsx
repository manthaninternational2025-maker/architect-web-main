"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useJournalData, ArticleItem } from "@/context/JournalDataContext";
import { resources } from "@/data/resources";
import { Sidebar } from "@/components/layout/Sidebar";
import { ArticlePdfButton } from "@/components/ui/ArticlePdfButton";
import { openArticlePdf, getArticlePdfBlobUrl } from "@/utils/pdfHelper";
import { getArticleUrl } from "@/utils/articleHelper";
import {
  Calendar,
  FileText,
  User,
  Search,
  Download,
} from "lucide-react";

function ResourceDetailContent() {
  const params = useParams();
  const rawSlug = (params?.slug as string) || "";
  const { articles, settings } = useJournalData();
  const [pdfInfo, setPdfInfo] = useState<{
    url: string;
    isBlob: boolean;
    mimeType: string;
    isDocx: boolean;
  } | null>(null);

  // Clean slug
  const cleanSlug = decodeURIComponent(rawSlug).toLowerCase().trim();

  // Search across live articles using foolproof ID and exact DOI matching
  let matchedArticle: Partial<ArticleItem> | null = null;

  // 1. Match by unambiguous ID prefix (e.g. "art-6-...", "article-6-...", "art-10")
  const explicitArtMatch =
    cleanSlug.match(/^art(?:icle)?-(\d+)(?:-|$)/) ||
    cleanSlug.match(/^id-(\d+)(?:-|$)/);
  if (explicitArtMatch) {
    const targetId = parseInt(explicitArtMatch[1], 10);
    matchedArticle = articles.find((a) => a.id === targetId) || null;
  }

  // 2. Match exact clean DOI (e.g. "10-5281-imjsi-2026-01-06")
  if (!matchedArticle) {
    matchedArticle =
      articles.find(
        (a) =>
          a.doi &&
          (a.doi.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase() === cleanSlug ||
            a.doi.toLowerCase() === cleanSlug)
      ) || null;
  }

  // 3. Match numeric ID from slug prefix ONLY IF it is not a DOI (DOIs start with 10- / 10.)
  if (
    !matchedArticle &&
    !cleanSlug.startsWith("10-") &&
    !cleanSlug.startsWith("10.")
  ) {
    const numPrefix = cleanSlug.match(/^(\d+)(?:-|$)/);
    if (numPrefix) {
      const targetId = parseInt(numPrefix[1], 10);
      matchedArticle = articles.find((a) => a.id === targetId) || null;
    }
  }

  // 4. Match exact title slug
  if (!matchedArticle) {
    matchedArticle =
      articles.find((a) => {
        if (!a.title) return false;
        const tSlug = a.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "");
        return tSlug === cleanSlug || cleanSlug.startsWith(tSlug.slice(0, 40));
      }) || null;
  }

  // 5. Check static resources (fallback if not in live database)
  const staticResource = resources.find(
    (r) =>
      r.slug.toLowerCase() === cleanSlug ||
      (r.doi &&
        r.doi.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase() === cleanSlug)
  );

  if (!matchedArticle && staticResource) {
    matchedArticle = {
      title: staticResource.title,
      authors: staticResource.author,
      volume: staticResource.volume,
      issue: staticResource.issue,
      date: staticResource.publishedDate,
      doi: staticResource.doi,
      abstract: staticResource.summary,
      pages: staticResource.pages,
      category: staticResource.category,
    };
  }

  // Setup PDF info hook safely at top level
  useEffect(() => {
    if (!matchedArticle) {
      setPdfInfo(null);
      return;
    }
    const info = getArticlePdfBlobUrl(matchedArticle, settings);
    setPdfInfo(info);

    return () => {
      if (info && info.isBlob) {
        URL.revokeObjectURL(info.url);
      }
    };
  }, [
    matchedArticle?.id,
    matchedArticle?.title,
    matchedArticle?.fileData,
    matchedArticle?.pdfUrl,
    settings,
  ]);

  // If article not found, show elegant fallback reader rather than 404
  if (!matchedArticle) {
    return (
      <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white border border-gray-300 p-6 sm:p-8 text-center space-y-4">
              <div className="w-12 h-12 bg-purple-100 text-[#700070] rounded-full flex items-center justify-center mx-auto">
                <Search className="w-6 h-6" />
              </div>
              <h1 className="font-editorial text-xl sm:text-2xl font-bold text-gray-900">
                Article Record In Digital Archive
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 max-w-lg mx-auto">
                The manuscript you requested ({rawSlug}) is preserved in our digital repository.
                Browse our current issue or select from the published papers below.
              </p>

              <div className="pt-4 border-t border-gray-200 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/current"
                  className="px-4 py-2 bg-[#700070] text-white hover:bg-[#5a005a] rounded text-xs font-bold transition-colors"
                >
                  View Current Issue Articles
                </Link>
                <Link
                  href="/archives"
                  className="px-4 py-2 border border-gray-300 text-gray-700 hover:border-[#700070] hover:text-[#700070] rounded text-xs font-semibold transition-colors"
                >
                  Browse Complete Archives
                </Link>
              </div>

              {/* Quick links to published articles */}
              <div className="mt-6 text-left border-t border-gray-200 pt-4">
                <h2 className="text-xs font-bold text-[#700070] uppercase tracking-wider mb-3">
                  Available Published Papers:
                </h2>
                <div className="space-y-2">
                  {articles.slice(0, 5).map((a) => (
                    <div
                      key={a.id}
                      className="p-2.5 rounded bg-gray-50 border border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs"
                    >
                      <div>
                        <Link
                          href={getArticleUrl(a)}
                          className="font-bold text-gray-900 hover:text-[#700070] line-clamp-1"
                        >
                          {a.title}
                        </Link>
                        <span className="text-[11px] text-gray-500">{a.authors}</span>
                      </div>
                      <ArticlePdfButton article={a} settings={settings} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-4">
            <Sidebar />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Content: Academic Article Reader */}
        <div className="lg:col-span-8 space-y-6">
          <article className="bg-white border border-gray-300 p-4 sm:p-8 shadow-xs">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-[11px] font-mono text-gray-500 mb-3">
              <Link href="/" className="hover:text-[#700070]">
                Home
              </Link>
              <span>/</span>
              <Link href="/current" className="hover:text-[#700070]">
                Current Issue
              </Link>
              <span>/</span>
              <span className="text-[#700070] font-semibold truncate max-w-xs">
                {matchedArticle.category || "Research Article"}
              </span>
            </div>

            {/* Article Header & Metadata */}
            <header className="border-b border-gray-200 pb-4 mb-6">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-gray-500 mb-2">
                <span className="px-2 py-0.5 bg-purple-50 text-[#700070] font-semibold border border-purple-200">
                  {matchedArticle.category || "Social Sciences"}
                </span>
                <span>•</span>
                <span>
                  {matchedArticle.volume || "Volume 1"} {matchedArticle.issue || "Issue 1"}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#700070]" />
                  {matchedArticle.date || "August 2026"}
                </span>
              </div>

              <h1 className="text-xl sm:text-2xl font-editorial font-bold text-gray-900 mb-3 leading-tight">
                {matchedArticle.title}
              </h1>

              <div className="flex flex-wrap items-center justify-between text-xs text-gray-600 gap-3 py-2.5 border-t border-b border-gray-200 font-mono">
                <div className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-gray-400" />
                  <span>Author: </span>
                  <strong className="text-gray-900">{matchedArticle.authors}</strong>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  {matchedArticle.pages && <span>Pages: {matchedArticle.pages}</span>}
                  <ArticlePdfButton article={matchedArticle} settings={settings} />
                </div>
              </div>
            </header>

            {/* Abstract */}
            <div className="p-5 bg-gray-50 border border-gray-300 rounded mb-6">
              <h2 className="font-editorial text-xs sm:text-sm font-bold text-[#700070] uppercase tracking-wider mb-2">
                Abstract
              </h2>
              <p className="text-xs sm:text-sm text-gray-800 leading-relaxed font-sans">
                {matchedArticle.abstract}
              </p>

              {matchedArticle.keywords && (
                <div className="mt-3.5 pt-2.5 border-t border-gray-200 text-xs">
                  <strong className="text-gray-900 font-editorial">Keywords: </strong>
                  <span className="text-gray-600 font-mono text-[11px]">
                    {matchedArticle.keywords}
                  </span>
                </div>
              )}
            </div>

            {/* Open and View PDF Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-purple-50/70 border border-purple-200 rounded">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <FileText className="w-5 h-5 text-[#700070] shrink-0" />
                <div className="truncate">
                  <h3 className="font-editorial text-sm font-bold text-gray-900 truncate">
                    {matchedArticle.fileName || "Full Published Manuscript Document"}
                  </h3>
                  <p className="text-[11px] text-gray-600 font-mono">
                    {matchedArticle.fileSize || "Official Galley PDF"} • Refereed &amp; Peer-Reviewed Open Access
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => openArticlePdf(matchedArticle, settings)}
                  className="px-5 py-2.5 bg-[#700070] text-white hover:bg-[#5a005a] text-xs sm:text-sm font-bold rounded inline-flex items-center gap-2 cursor-pointer shadow-xs transition-colors"
                  title="Open and view PDF in full browser window"
                >
                  <FileText className="w-4 h-4" />
                  <span>Open and View PDF</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (pdfInfo?.url) {
                      const a = document.createElement("a");
                      a.href = pdfInfo.url;
                      a.download =
                        matchedArticle.fileName ||
                        `${matchedArticle.title?.replace(/[^a-zA-Z0-9]/g, "-").slice(0, 40) || "article"}.pdf`;
                      document.body.appendChild(a);
                      a.click();
                      document.body.removeChild(a);
                    } else {
                      openArticlePdf(matchedArticle, settings);
                    }
                  }}
                  className="px-4 py-2.5 border border-[#700070] text-[#700070] hover:bg-purple-100 text-xs sm:text-sm font-bold rounded inline-flex items-center gap-1.5 cursor-pointer transition-colors"
                  title="Download manuscript PDF file"
                >
                  <Download className="w-4 h-4" />
                  <span>Download PDF</span>
                </button>
              </div>
            </div>
          </article>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4">
          <div className="sticky top-20">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ResourceDetailPage() {
  return (
    <React.Suspense
      fallback={
        <div className="w-full p-12 text-center text-xs font-mono text-gray-500 bg-white border border-gray-200">
          Loading published manuscript from journal digital repository...
        </div>
      }
    >
      <ResourceDetailContent />
    </React.Suspense>
  );
}
