"use client";

import React, { useEffect, useState } from "react";
import { ArticleItem, JournalSettings } from "@/context/JournalDataContext";
import { getArticlePdfBlobUrl, openArticlePdf } from "@/utils/pdfHelper";
import {
  X,
  ExternalLink,
  Download,
  FileText,
  Printer,
  Sparkles,
  Info,
} from "lucide-react";

interface ArticlePdfModalProps {
  article: ArticleItem | null;
  settings?: JournalSettings;
  onClose: () => void;
}

export function ArticlePdfModal({
  article,
  settings,
  onClose,
}: ArticlePdfModalProps) {
  const [pdfInfo, setPdfInfo] = useState<{
    url: string;
    isBlob: boolean;
    mimeType: string;
    isDocx: boolean;
  } | null>(null);

  useEffect(() => {
    if (!article) {
      setPdfInfo(null);
      return;
    }
    const info = getArticlePdfBlobUrl(article, settings);
    setPdfInfo(info);

    return () => {
      // Cleanup blob url when modal unmounts or article changes
      if (info && info.isBlob) {
        URL.revokeObjectURL(info.url);
      }
    };
  }, [article, settings]);

  if (!article || !pdfInfo) return null;

  const fileName =
    article.fileName ||
    `${article.title.replace(/[^a-zA-Z0-9]/g, "-").slice(0, 40)}.pdf`;

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = pdfInfo.url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handlePrint = () => {
    window.open(pdfInfo.url, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-2 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-5xl h-[92vh] flex flex-col overflow-hidden border border-slate-200">
        {/* Modal Header */}
        <div className="bg-[#700070] text-white px-4 py-3 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="p-1.5 bg-white/15 rounded">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div className="truncate">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-white/20 text-purple-100">
                  {article.fileData ? "Uploaded Document" : "Official Galley PDF"}
                </span>
                <span className="text-xs text-purple-200 font-mono hidden sm:inline">
                  {article.volume} {article.issue} • DOI: {article.doi}
                </span>
              </div>
              <h3 className="font-editorial text-sm sm:text-base font-bold text-white truncate max-w-2xl mt-0.5">
                {article.title}
              </h3>
            </div>
          </div>

          {/* Action buttons in header */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => openArticlePdf(article, settings)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/15 hover:bg-white/25 text-white rounded text-xs font-semibold transition-colors cursor-pointer"
              title="Open in new browser tab"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Open in Full Tab</span>
            </button>

            <button
              type="button"
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-[#700070] hover:bg-purple-50 rounded text-xs font-bold transition-colors cursor-pointer shadow-xs"
              title="Download PDF"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer ml-1"
              title="Close Viewer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Sub-header info bar */}
        <div className="bg-slate-50 border-b border-slate-200 px-4 py-2 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">{article.authors}</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500 font-mono text-[11px]">
              {article.fileName || "manuscript.pdf"}
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-slate-500">
            {article.fileData ? (
              <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium border border-emerald-200">
                <Sparkles className="w-3 h-3 text-emerald-600" />
                Live Uploaded Document
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-purple-700 bg-purple-50 px-2 py-0.5 rounded font-medium border border-purple-200">
                <Info className="w-3 h-3 text-purple-600" />
                Peer-Reviewed Academic Galley
              </span>
            )}
          </div>
        </div>

        {/* PDF Viewer Body */}
        <div className="flex-1 bg-slate-200 relative overflow-hidden">
          {pdfInfo.isDocx ? (
            <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-white">
              <FileText className="w-16 h-16 text-[#700070] mb-4" />
              <h4 className="text-lg font-bold text-slate-900 mb-2">
                Word Document (.docx / .doc)
              </h4>
              <p className="text-sm text-slate-600 max-w-md mb-6">
                This article was uploaded as a Word Document ({article.fileName}).
                Click below to download and view in Microsoft Word or Google Docs.
              </p>
              <button
                type="button"
                onClick={handleDownload}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#700070] text-white rounded font-bold text-sm shadow hover:bg-[#5a005a] transition-colors"
              >
                <Download className="w-4 h-4" />
                Download {article.fileName || "Document"}
              </button>
            </div>
          ) : (
            <iframe
              src={pdfInfo.url}
              title={article.title}
              className="w-full h-full border-0 bg-white"
            />
          )}
        </div>
      </div>
    </div>
  );
}
