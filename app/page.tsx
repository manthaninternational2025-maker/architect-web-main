import React from "react";
import Link from "next/link";
import { Sidebar } from "@/components/layout/Sidebar";
import { SpecTable } from "@/components/ui/SpecTable";
import { FileText, Calendar, User, ArrowRight } from "lucide-react";

export default function HomePage() {
  const currentArticles = [
    {
      id: "1",
      title: "The Power of Negotiation: Methodological Transitions in Contemporary Social Research",
      authors: "Dr. A. Sharma, Prof. R. K. Verma (Advisory Authors)",
      pages: "01–08",
      slug: "how-to-structure-a-research-proposal",
    },
    {
      id: "2",
      title: "Exploring the Role of Psychology in Achievement Motivation: Insights for Organizational and Sports Contexts",
      authors: "K. Uday Bhanu, Dr. S. Sudha (Lead Analysts)",
      pages: "09–15",
      slug: "research-data-analysis-basics",
    },
    {
      id: "3",
      title: "Leveraging Artificial Intelligence in English Language Teaching: An Empirical Study on Regional Learners",
      authors: "Dr. Prateek Tanwar (Author)",
      pages: "16–22",
      slug: "understanding-similarity-reports",
    },
    {
      id: "4",
      title: "Understanding Structural Equation Modeling in Sport and Organizational Contexts: A Systematic Review",
      authors: "Dr. Meenakshi Sundaram, Rajeshwari N. (Authors)",
      pages: "23–30",
      slug: "preparing-your-thesis-for-final-submission",
    },
    {
      id: "5",
      title: "APA 7 Style Manual Standardization: Citation Accuracy as a Determinant of Scholarly Credibility",
      authors: "Editorial Board, Impulse Research Work",
      pages: "31–38",
      slug: "apa-7-referencing-guide",
    },
  ];

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* -------------------------------------------------------------
            LEFT COLUMN (Main Content Area — Exactly like Reference)
           ------------------------------------------------------------- */}
        <div className="lg:col-span-8 space-y-4">
          <h1 className="text-xl sm:text-2xl font-editorial font-bold text-[#111111] border-b border-gray-200 pb-2">
            Home
          </h1>

          <p className="text-xs sm:text-sm text-justify text-gray-800 leading-relaxed font-sans">
            <strong>Impulse Research Work (ISSN: 3139-695X)</strong> is an open access peer reviewed refereed journal.
          </p>

          <p className="text-xs sm:text-sm text-justify text-gray-800 leading-relaxed font-sans">
            The aim of <strong>Impulse Research Work (ISSN: 3139-695X)</strong> is to encourage scientists, academicians and students to publish their experimental and theoretical details. <strong>Impulse Research Work</strong> provides an advanced knowledge platform for the <strong>Social Sciences, Humanities, Management, Commerce, Education &amp; Multidisciplinary Research</strong> professionals.
          </p>

          {/* Journal Particulars Table (Exact Reference Format) */}
          <SpecTable />

          <p className="text-xs sm:text-sm text-justify text-gray-800 leading-relaxed font-sans pt-2">
            <strong>Impulse Research Work (ISSN: 3139-695X)</strong>, an open access peer reviewed refereed online journal, presents original research articles and rapid communications, covering all areas of Social Sciences, Humanities, Management, Commerce, Education and Multidisciplinary Studies. The primary mission of the journal is to become the premier source of high quality research from whole of the world.
          </p>

          <p className="text-xs sm:text-sm text-justify text-gray-800 leading-relaxed font-sans">
            <strong>Impulse Research Work (ISSN: 3139-695X)</strong> considers all manuscripts on the strict condition that they have not been published already, under review elsewhere, nor are they under consideration for publication or in press elsewhere. Papers not sufficiently substantiated by experimental detail will not be published. Experimental research on vertebrates or any regulated invertebrates must comply with Institutional, National guidelines, and where available should have been approved by an appropriate ethics committee. A statement detailing compliance with guidelines and/or ethical approval must be included in the manuscript. All research must have been carried out within an appropriate ethical framework. If there is suspicion that work has not taken place within an appropriate ethical framework, Editors may reject the manuscript. All research articles, and most other article types, published in <strong>Impulse Research Work</strong> undergo thorough peer review process and the process is single blinded. Authors must be careful when they reproduce text, tables or illustrations in their manuscript from other sources. Plagiarism will be viewed seriously. All accepted manuscripts are subjected to editorial changes. All rights are reserved to Editor-in-chief, <strong>Impulse Research Work</strong>.
          </p>

          <p className="text-xs sm:text-sm text-justify text-gray-800 leading-relaxed font-sans">
            <strong>The Journal of Academic &amp; Multidisciplinary Research (ISSN: 3139-695X)</strong> is an academic journal covering all aspects of Social Sciences, Humanities, Management, Commerce and Multidisciplinary Research.
          </p>

          {/* -------------------------------------------------------------
              CURRENT ISSUE & RECENT ARTICLES
             ------------------------------------------------------------- */}
          <section id="homepageIssue" className="pt-6 border-t border-gray-300 space-y-4">
            <h2 className="text-lg sm:text-xl font-editorial font-bold text-[#700070] border-b border-gray-200 pb-1.5">
              Current Issue: Vol. 1 No. 1 (2026)
            </h2>

            <div className="flex items-center gap-2 text-xs text-gray-600 font-mono pb-2 border-b border-gray-200">
              <span className="w-2 h-2 rounded-full bg-[#700070]" />
              <Calendar className="w-3.5 h-3.5 text-[#700070]" />
              <span>Published: 2026-02-15</span>
            </div>

            <div className="divide-y divide-gray-200">
              {currentArticles.map((art) => (
                <div
                  key={art.id}
                  className="py-3 px-2 rounded hover:bg-gray-50 transition-colors first:pt-2 last:pb-0"
                >
                  <h3 className="font-editorial text-sm sm:text-base font-bold text-gray-900 hover:text-[#700070] mb-1 leading-snug">
                    <Link href={`/resources/${art.slug}`}>
                      {art.title}
                    </Link>
                  </h3>

                  <div className="text-xs text-gray-600 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-gray-400" />
                      <span>{art.authors}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[11px]">Pages: {art.pages}</span>
                      <Link
                        href={`/resources/${art.slug}`}
                        className="px-2 py-0.5 border border-[#700070] text-[#700070] hover:bg-[#700070] hover:text-white text-[11px] font-mono font-bold tracking-wider transition-all inline-flex items-center gap-1"
                      >
                        <FileText className="w-3 h-3 text-[#700070]" />
                        <span>PDF</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-gray-200">
              <Link
                href="/archives"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#700070] hover:underline uppercase tracking-wider group"
              >
                <span>View All Issues in Archive</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </section>
        </div>

        {/* -------------------------------------------------------------
            RIGHT COLUMN (Sidebar — Exactly like Reference)
           ------------------------------------------------------------- */}
        <div className="lg:col-span-4">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
