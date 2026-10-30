"use client";

import React, { useState } from "react";
import { ArticleItem, JournalSettings } from "@/context/JournalDataContext";
import { openArticlePdf } from "@/utils/pdfHelper";
import { ArticlePdfModal } from "@/components/ui/ArticlePdfModal";
import { FileText, ExternalLink } from "lucide-react";

interface ArticlePdfButtonProps {
  article: Partial<ArticleItem>;
  settings?: JournalSettings;
  className?: string;
  variant?: "outline" | "solid" | "compact";
  showModalFallback?: boolean;
}

export function ArticlePdfButton({
  article,
  settings,
  className,
  variant = "outline",
  showModalFallback = true,
}: ArticlePdfButtonProps) {
  const [modalArticle, setModalArticle] = useState<ArticleItem | null>(null);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      openArticlePdf(article, settings);
    } catch (err) {
      console.error("Error opening PDF in new tab:", err);
      if (showModalFallback) {
        setModalArticle(article as ArticleItem);
      }
    }
  };

  const defaultClasses = {
    outline:
      "px-2.5 py-0.5 border border-[#700070] text-[#700070] hover:bg-[#700070] hover:text-white text-[11px] font-mono font-bold tracking-wider transition-all inline-flex items-center gap-1 cursor-pointer rounded-xs",
    solid:
      "px-4 py-2 bg-[#700070] text-white hover:bg-[#5a005a] text-xs font-mono font-bold tracking-wider transition-all inline-flex items-center gap-1.5 cursor-pointer rounded shadow-xs",
    compact:
      "px-2 py-0.5 border border-purple-200 bg-purple-50 text-[#700070] hover:bg-[#700070] hover:text-white text-[10px] font-mono font-bold transition-colors inline-flex items-center gap-1 cursor-pointer rounded",
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className={className || defaultClasses[variant]}
        title={
          article.fileName
            ? `Open ${article.fileName}`
            : `Open Official PDF for "${article.title || "Article"}"`
        }
      >
        <FileText className="w-3 h-3 text-current shrink-0" />
        <span>PDF</span>
      </button>

      {modalArticle && (
        <ArticlePdfModal
          article={modalArticle}
          settings={settings}
          onClose={() => setModalArticle(null)}
        />
      )}
    </>
  );
}
