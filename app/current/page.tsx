import React from "react";
import Link from "next/link";
import { Sidebar } from "@/components/layout/Sidebar";
import { FileText, Calendar, User } from "lucide-react";

export const metadata = {
  title: "Current Issue | Impulse Research Work",
  description: "Vol. 1 No. 1 (2026) - Current academic issue and research publications.",
};

export default function CurrentPage() {
  const articles = [
    {
      id: "1",
      title: "The Power of Negotiation: Methodological Transitions in Contemporary Social Research",
      authors: "Dr. A. Sharma, Prof. R. K. Verma (Advisory Authors)",
      pages: "01–08",
      doi: "10.5281/irw.2026.01",
      slug: "how-to-structure-a-research-proposal",
    },
    {
      id: "2",
      title: "Exploring the Role of Psychology in Achievement Motivation: Insights for Organizational and Sports Contexts",
      authors: "K. Uday Bhanu, Dr. S. Sudha (Lead Analysts)",
      pages: "09–15",
      doi: "10.5281/irw.2026.02",
      slug: "research-data-analysis-basics",
    },
    {
      id: "3",
      title: "Leveraging Artificial Intelligence in English Language Teaching: An Empirical Study on Regional Learners",
      authors: "Dr. Prateek Tanwar (Author)",
      pages: "16–22",
      doi: "10.5281/irw.2026.03",
      slug: "understanding-similarity-reports",
    },
    {
      id: "4",
      title: "Understanding Structural Equation Modeling in Sport and Organizational Contexts: A Systematic Review",
      authors: "Dr. Meenakshi Sundaram, Rajeshwari N. (Authors)",
      pages: "23–30",
      doi: "10.5281/irw.2026.04",
      slug: "preparing-your-thesis-for-final-submission",
    },
    {
      id: "5",
      title: "APA 7 Style Manual Standardization: Citation Accuracy as a Determinant of Scholarly Credibility",
      authors: "Editorial Board, Impulse Research Work",
      pages: "31–38",
      doi: "10.5281/irw.2026.05",
      slug: "apa-7-referencing-guide",
    },
  ];

  return (
    <div className="academic-container py-6 sm:py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-8 bg-white border border-sand-200 p-6 sm:p-8 rounded shadow-xs">
          <h1 className="text-xl sm:text-2xl font-editorial font-bold text-navy-950 border-b border-sand-200 pb-2 mb-4">
            Current Issue
          </h1>

          <div className="text-sm font-editorial font-bold text-navy-950 mb-1">
            Vol. 1 No. 1 (2026): Volume 1 Issue 1 Jan-Mar 2026
          </div>

          <div className="flex items-center gap-2 text-xs text-academic-muted font-mono mb-6 pb-3 border-b border-sand-200">
            <Calendar className="w-3.5 h-3.5 text-orange-600" />
            <span>Published: 2026-02-15</span>
          </div>

          <h2 className="text-base font-editorial font-bold text-navy-950 mb-4">
            Articles &amp; Research Monographs
          </h2>

          <div className="divide-y divide-sand-200">
            {articles.map((art) => (
              <div key={art.id} className="py-4 first:pt-0 last:pb-0">
                <h3 className="font-editorial text-base font-bold text-navy-950 hover:text-orange-600 mb-1.5 leading-snug">
                  <Link href={`/resources/${art.slug}`}>
                    {art.title}
                  </Link>
                </h3>

                <div className="text-xs text-academic-muted flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-gray-500" />
                    <span>{art.authors}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[11px]">Pages: {art.pages}</span>
                    <Link
                      href={`/resources/${art.slug}`}
                      className="px-2.5 py-0.5 rounded border border-navy-950 text-navy-950 hover:bg-navy-950 hover:text-white text-[11px] font-mono font-bold tracking-wider transition-colors inline-flex items-center gap-1"
                    >
                      <FileText className="w-3 h-3 text-orange-600" />
                      <span>PDF</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-4 border-t border-sand-200">
            <Link
              href="/archives"
              className="text-xs font-bold text-orange-600 hover:underline uppercase tracking-wider"
            >
              View All Issues →
            </Link>
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
