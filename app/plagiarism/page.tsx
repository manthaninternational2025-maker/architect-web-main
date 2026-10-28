import React from "react";
import Link from "next/link";
import { Sidebar } from "@/components/layout/Sidebar";
import { companyInfo } from "@/data/companyInfo";
import { ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Plagiarism & Similarity Policy | Impulse Research Work",
  description: "Plagiarism threshold, similarity screening tools (Drillbit / Turnitin), and ethics protocol.",
};

export default function PlagiarismPage() {
  return (
    <div className="academic-container py-6 sm:py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-white border border-sand-200 p-6 sm:p-8 rounded shadow-xs text-xs sm:text-sm text-academic-text space-y-6 leading-relaxed">
          <h1 className="text-xl sm:text-2xl font-editorial font-bold text-navy-950 border-b border-sand-200 pb-2">
            Plagiarism &amp; Academic Originality Policy
          </h1>

          <div className="p-4 bg-sand-50 rounded border border-sand-200 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-navy-950 block mb-1">
                Zero Tolerance for Academic Dishonesty
              </strong>
              <p className="text-academic-muted">
                Impulse Research Work strictly adheres to international anti-plagiarism guidelines. All submitted manuscripts are screened using licensed academic software (Drillbit / Turnitin) prior to peer review.
              </p>
            </div>
          </div>

          <section className="space-y-2">
            <h2 className="font-editorial text-base font-bold text-navy-950">
              1. Plagiarism Screening Software
            </h2>
            <p className="text-academic-muted">
              We employ <strong>{companyInfo.plagiarismTool}</strong> for comprehensive diagnostic screening against billions of web pages, institutional dissertations, and academic publisher databases.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-editorial text-base font-bold text-navy-950">
              2. Acceptable Similarity Threshold
            </h2>
            <ul className="list-disc pl-5 space-y-1 text-academic-muted">
              <li><strong>Overall Similarity Index:</strong> Must not exceed <strong>10%</strong> (excluding standard references, bibliography, and statutory quotes).</li>
              <li><strong>Single-Source Limit:</strong> No individual source match should exceed <strong>2%</strong>.</li>
              <li>Direct verbatim quotations must be enclosed in quotation marks and cited with exact page numbers.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-editorial text-base font-bold text-navy-950">
              3. Types of Plagiarism Screened
            </h2>
            <ul className="list-disc pl-5 space-y-1 text-academic-muted">
              <li><strong>Direct / Verbatim Plagiarism:</strong> Transcribing portions of another work without quotation or attribution.</li>
              <li><strong>Paraphrasing Without Citation:</strong> Restating another author&apos;s thoughts without citing the original source.</li>
              <li><strong>Patchwriting:</strong> Superficial synonym replacement while retaining original sentence structures.</li>
              <li><strong>Self-Plagiarism:</strong> Re-using one&apos;s own previously published work without explicit cross-referencing.</li>
            </ul>
          </section>

          <div className="pt-4 border-t border-sand-200 flex items-center gap-4">
            <Link
              href="/services/similarity-review"
              className="text-xs font-bold text-orange-600 hover:underline uppercase tracking-wider"
            >
              Explore Our Similarity Review Service →
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
