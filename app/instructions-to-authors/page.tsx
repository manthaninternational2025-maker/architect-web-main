import React from "react";
import Link from "next/link";
import { Sidebar } from "@/components/layout/Sidebar";

export const metadata = {
  title: "Instructions to Authors | Impulse Research Work",
  description: "Submission guidelines, manuscript preparation, formatting rules, and author checklist.",
};

export default function InstructionsToAuthorsPage() {
  return (
    <div className="academic-container py-6 sm:py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-white border border-sand-200 p-6 sm:p-8 rounded shadow-xs text-xs sm:text-sm text-academic-text space-y-6 leading-relaxed">
          <h1 className="text-xl sm:text-2xl font-editorial font-bold text-navy-950 border-b border-sand-200 pb-2">
            Instructions to Authors
          </h1>

          <section className="space-y-2">
            <h2 className="font-editorial text-base font-bold text-navy-950">
              1. Manuscript Preparation
            </h2>
            <p className="text-academic-muted">
              Manuscripts must be submitted in Microsoft Word (.doc / .docx) or PDF format. Text should be double-spaced in 12-point Times New Roman or Georgia font with 1-inch margins on all sides. All pages must be numbered consecutively.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-editorial text-base font-bold text-navy-950">
              2. Manuscript Structure (IMRAD)
            </h2>
            <p className="text-academic-muted">
              Standard research articles should follow the IMRAD format:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-academic-muted">
              <li><strong>Title Page:</strong> Title, author names, institutional affiliations, and corresponding author email.</li>
              <li><strong>Abstract:</strong> Structured or unstructured abstract of 150–250 words accompanied by 4–6 keywords.</li>
              <li><strong>Introduction:</strong> Background, literature rationale, and explicitly stated research objectives or hypotheses.</li>
              <li><strong>Methods:</strong> Research design, sampling frame, instrumentation, data collection, and ethical compliance.</li>
              <li><strong>Results:</strong> Empirical findings presented logically with numbered tables and figures.</li>
              <li><strong>Discussion &amp; Conclusion:</strong> Theoretical implications, practical significance, limitations, and future directions.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-editorial text-base font-bold text-navy-950">
              3. Referencing Style (APA 7th Edition)
            </h2>
            <p className="text-academic-muted">
              References must follow the Publication Manual of the American Psychological Association (7th edition). Ensure every in-text citation matches the reference list precisely with live DOI links.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-editorial text-base font-bold text-navy-950">
              4. Submission Checklist
            </h2>
            <ul className="list-disc pl-5 space-y-1 text-academic-muted">
              <li>The manuscript has not been previously published nor is under consideration elsewhere.</li>
              <li>Plagiarism similarity index is within legitimate academic limits (under 10% excluding bibliography).</li>
              <li>All co-authors have reviewed and approved the submitted version.</li>
            </ul>
          </section>

          <div className="pt-4 border-t border-sand-200">
            <Link
              href="/submit"
              className="inline-block px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider rounded"
            >
              Submit Your Manuscript Now →
            </Link>
          </div>
        </div>

        <div className="lg:col-span-4">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
