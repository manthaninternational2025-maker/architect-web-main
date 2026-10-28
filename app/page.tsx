import React from "react";
import Link from "next/link";
import { companyInfo } from "@/data/companyInfo";
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

  const focusAreas = [
    "Social Sciences & Social Theory",
    "Humanities & Cultural Studies",
    "Management & Business Studies",
    "Commerce & Financial Studies",
    "Education & Learning Sciences",
    "Multidisciplinary Research",
    "Psychology & Behavioral Sciences",
    "Economics & Development Studies",
  ];

  return (
    <div className="academic-container py-6 sm:py-8 animate-academic-fade">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Content Area (modeled directly on GIJHSS layout) */}
        <div className="lg:col-span-8 bg-white border border-sand-200 p-6 sm:p-8 rounded shadow-xs space-y-10">
          {/* ------------------------------------------------------------------
              SECTION 1: ABOUT THE JOURNAL / IMPULSE RESEARCH WORK
             ------------------------------------------------------------------ */}
          <section id="homepageAbout" className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-editorial font-bold text-navy-950 border-b border-sand-200 pb-2">
              About the Journal &amp; Research Consultancy
            </h2>

            <p className="text-xs sm:text-sm text-academic-text leading-relaxed">
              <strong>Impulse Research Work</strong> is a peer-reviewed, open-access academic and research consultancy platform dedicated to the exploration and advancement of the humanities, social sciences, commerce, and empirical management studies. Impulse provides an authoritative forum for scholarly reviews, doctoral thesis mentorship, and interdisciplinary analyses that address cultural dynamics, methodological validity, and social transformations across diverse societies.
            </p>

            {/* The Reference Journal Specification Table */}
            <SpecTable />

            <div className="space-y-2 pt-2">
              <p className="text-xs sm:text-sm font-semibold text-navy-950">
                The portal welcomes comprehensive reviews, theoretical discussions, and empirical studies in areas including, but not limited to:
              </p>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-academic-muted list-disc pl-5">
                {focusAreas.map((area, idx) => (
                  <li
                    key={idx}
                    className="transition-transform duration-150 hover:translate-x-1 hover:text-navy-950 cursor-default"
                  >
                    {area}
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-xs sm:text-sm text-academic-text leading-relaxed pt-2">
              Impulse Research Work emphasizes research that critically examines the intersections between social phenomena and human experiences, fostering dialogues that can shape social change, policy development, and educational practices worldwide.
            </p>

            <p className="text-xs sm:text-sm text-academic-text leading-relaxed italic text-academic-muted">
              Our mission is to create a space for intellectual exchange, promote interdisciplinary perspectives, and contribute to the understanding of humanity, society, and culture in an ever-changing world.
            </p>
          </section>

          {/* ------------------------------------------------------------------
              SECTION 2: CURRENT ISSUE (Identical to Novalex Issue structure)
             ------------------------------------------------------------------ */}
          <section id="homepageIssue" className="pt-6 border-t border-sand-200 space-y-4">
            <h2 className="text-xl sm:text-2xl font-editorial font-bold text-navy-950 border-b border-sand-200 pb-2">
              Current Issue
            </h2>

            <div className="text-sm font-editorial font-bold text-navy-950">
              Vol. 1 No. 1 (2026): Volume 1 Issue 1 Jan-Mar 2026
            </div>

            <div className="flex items-center gap-2 text-xs text-academic-muted font-mono pb-2 border-b border-sand-100">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-indicator" />
              <Calendar className="w-3.5 h-3.5 text-orange-600" />
              <span>Published: 2026-02-15</span>
            </div>

            <h3 className="text-base font-editorial font-bold text-navy-950 pt-1">
              Articles
            </h3>

            {/* CMP Article List with PDF Buttons */}
            <div className="divide-y divide-sand-200">
              {currentArticles.map((art) => (
                <div
                  key={art.id}
                  className="article-row py-3.5 px-2.5 rounded transition-all first:pt-2 last:pb-0"
                >
                  <h4 className="font-editorial text-base font-bold text-navy-950 hover:text-orange-600 mb-1.5 leading-snug">
                    <Link href={`/resources/${art.slug}`}>
                      {art.title}
                    </Link>
                  </h4>

                  <div className="text-xs text-academic-muted flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-gray-500" />
                      <span>{art.authors}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[11px]">Pages: {art.pages}</span>
                      <Link
                        href={`/resources/${art.slug}`}
                        className="pdf-badge px-2.5 py-1 rounded border border-navy-950 text-navy-950 hover:bg-navy-950 hover:text-white text-[11px] font-mono font-bold tracking-wider transition-all inline-flex items-center gap-1 shadow-xs"
                      >
                        <FileText className="w-3 h-3 text-orange-600" />
                        <span>PDF</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-sand-200">
              <Link
                href="/archives"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 hover:underline uppercase tracking-wider group"
              >
                <span>View All Issues</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </section>
        </div>

        {/* ------------------------------------------------------------------
            SIDEBAR (Clean OJS style)
           ------------------------------------------------------------------ */}
        <div className="lg:col-span-4">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
