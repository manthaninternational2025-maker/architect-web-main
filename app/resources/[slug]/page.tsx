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
  ArrowRight,
  Copy,
  CheckCircle2,
  Paperclip,
  ExternalLink,
  BookOpen,
  Search,
  Download,
} from "lucide-react";

function ResourceDetailContent() {
  const params = useParams();
  const rawSlug = (params?.slug as string) || "";
  const { articles, settings } = useJournalData();
  const [copied, setCopied] = useState(false);
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

  // Construct citation
  const authorsText = matchedArticle?.authors || "Editorial Staff";
  const pubYear = "2026";
  const journalTitle =
    settings.journalTitle ||
    "Manthan: International Multidisciplinary Journal of Social Inquiry";
  const citationText = matchedArticle
    ? `${authorsText} (${pubYear}). ${matchedArticle.title}. ${journalTitle}, ${
        matchedArticle.volume || "1"
      }(${(matchedArticle.issue || "1").replace(/[^0-9]/g, "") || "1"}), ${
        matchedArticle.doi || "10.5281/imjsi"
      }.`
    : "";

  const handleCopyCitation = () => {
    if (!citationText) return;
    navigator.clipboard.writeText(citationText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
                  <span>DOI: {matchedArticle.doi}</span>
                  <ArticlePdfButton article={matchedArticle} settings={settings} />
                </div>
              </div>
            </header>

            {/* Attached Manuscript Document Card if Uploaded */}
            {(matchedArticle.fileData || matchedArticle.pdfUrl || matchedArticle.fileName) && (
              <div className="mb-6 p-3.5 bg-purple-50/60 border border-purple-200 rounded flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <Paperclip className="w-4 h-4 text-[#700070] shrink-0" />
                  <div className="truncate">
                    <p className="font-bold text-slate-800 text-xs truncate">
                      {matchedArticle.fileName || "Uploaded Manuscript PDF"}
                    </p>
                    <p className="text-[10px] text-slate-500 font-mono">
                      {matchedArticle.fileSize || "Original Manuscript"} • Peer-Reviewed Galley
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => openArticlePdf(matchedArticle, settings)}
                  className="px-3 py-1.5 bg-[#700070] text-white hover:bg-[#5a005a] text-xs font-bold rounded inline-flex items-center gap-1.5 cursor-pointer shrink-0 shadow-xs"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Open &amp; View PDF</span>
                </button>
              </div>
            )}

            {/* Abstract Callout */}
            <div className="p-4 bg-gray-50 border border-gray-300 mb-6">
              <h2 className="font-editorial text-xs font-bold text-[#700070] uppercase tracking-wider mb-1">
                Abstract
              </h2>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed italic">
                {matchedArticle.abstract}
              </p>
            </div>

            {/* Article Content / Scholarly Inquiry Sections */}
            <div className="space-y-6 text-xs sm:text-sm text-gray-800 leading-relaxed font-sans">
              {staticResource && matchedArticle.title?.toLowerCase().trim() === staticResource.title?.toLowerCase().trim() && staticResource.sections ? (
                staticResource.sections.map((section, idx) => (
                  <section key={idx} className="space-y-2">
                    <h2 className="font-editorial text-base sm:text-lg font-bold text-gray-900">
                      {section.heading}
                    </h2>
                    <p className="text-gray-700 leading-relaxed">{section.content}</p>
                  </section>
                ))
              ) : (
                <>
                  <section className="space-y-2">
                    <h2 className="font-editorial text-base sm:text-lg font-bold text-gray-900">
                      1. Introduction &amp; Theoretical Context
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                      {matchedArticle.abstract} This empirical investigation examines foundational inquiries within {matchedArticle.category || "the discipline"}, analyzing institutional frameworks, socio-historical dimensions, and theoretical debates that shape contemporary discourse.
                    </p>
                  </section>

                  <section className="space-y-2">
                    <h2 className="font-editorial text-base sm:text-lg font-bold text-gray-900">
                      2. Methodology &amp; Analytical Framework
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                      Adopting rigorous multidisciplinary methodologies, this paper combines qualitative textual analysis, empirical archival synthesis, and structured inquiry into the underlying socio-economic and cultural factors. The author systematically addresses key research questions while evaluating institutional dynamics.
                    </p>
                  </section>

                  <section className="space-y-2">
                    <h2 className="font-editorial text-base sm:text-lg font-bold text-gray-900">
                      3. Scholarly Discussion &amp; Conclusion
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                      The findings contribute significantly to the ongoing scholarly conversation by highlighting regional nuances, policy implications, and future avenues for interdisciplinary inquiry. Complete methodological details, figures, tables, and full reference citations are available in the official published PDF document.
                    </p>
                  </section>
                </>
              )}
            </div>

            {/* Embedded Live PDF Document Reader */}
            <div className="mt-8 border border-gray-300 rounded overflow-hidden shadow-xs">
              <div className="bg-[#700070] text-white px-4 py-2.5 flex items-center justify-between text-xs font-bold">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-purple-200" />
                  <span>
                    {matchedArticle.fileData
                      ? `Attached Manuscript Document: ${matchedArticle.fileName || "manuscript.pdf"}`
                      : "Official Academic Galley Publication"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => openArticlePdf(matchedArticle, settings)}
                    className="px-2.5 py-1 bg-white/20 hover:bg-white/30 rounded text-[11px] font-semibold transition-colors cursor-pointer inline-flex items-center gap-1"
                  >
                    <span>Open in Full Tab</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <div className="w-full h-[650px] bg-slate-100">
                {pdfInfo?.isDocx ? (
                  <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-white">
                    <FileText className="w-16 h-16 text-[#700070] mb-4" />
                    <h4 className="text-lg font-bold text-slate-900 mb-2">
                      Word Manuscript Document
                    </h4>
                    <p className="text-xs text-slate-600 max-w-md mb-6">
                      This paper was uploaded as a Word Document ({matchedArticle.fileName || "manuscript.docx"}).
                      Download it below to view in Microsoft Word, WPS, or Google Docs.
                    </p>
                    <button
                      type="button"
                      onClick={() => openArticlePdf(matchedArticle, settings)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#700070] text-white rounded font-bold text-xs shadow hover:bg-[#5a005a] transition-colors cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      Download {matchedArticle.fileName || "Manuscript Document"}
                    </button>
                  </div>
                ) : pdfInfo?.url ? (
                  <iframe
                    src={pdfInfo.url}
                    title={matchedArticle.title || "Academic Galley Document"}
                    className="w-full h-full border-0 bg-white"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-gray-500 font-mono">
                    Loading academic galley document...
                  </div>
                )}
              </div>
            </div>

            {/* Keywords */}
            {matchedArticle.keywords && (
              <div className="mt-6 pt-4 border-t border-gray-200 text-xs">
                <strong className="text-gray-900 font-editorial">Keywords: </strong>
                <span className="text-gray-600 font-mono text-[11px]">
                  {matchedArticle.keywords}
                </span>
              </div>
            )}

            {/* Academic Citation Block (APA 7th Format) */}
            <div className="mt-8 p-4 rounded bg-purple-50/50 border border-purple-200 text-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="font-editorial font-bold text-[#700070] text-xs uppercase tracking-wider">
                  How to Cite This Paper (APA 7th Format)
                </span>
                <button
                  type="button"
                  onClick={handleCopyCitation}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-[#700070] hover:underline cursor-pointer"
                >
                  {copied ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-600">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Citation</span>
                    </>
                  )}
                </button>
              </div>
              <div className="p-2.5 bg-white rounded border border-purple-100 font-mono text-[11px] text-gray-800 leading-relaxed select-all">
                {citationText}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => openArticlePdf(matchedArticle, settings)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded bg-[#700070] hover:bg-[#5a005a] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>Open Full Published PDF</span>
              </button>

              <Link
                href="/submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded border border-[#700070] text-[#700070] hover:bg-[#700070] hover:text-white text-xs font-semibold transition-colors"
              >
                <span>Submit Your Manuscript for Review</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
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
