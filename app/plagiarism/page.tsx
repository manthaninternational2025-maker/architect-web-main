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
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 text-xs sm:text-sm text-gray-800 space-y-6 leading-relaxed">
          <h1 className="text-xl sm:text-2xl font-editorial font-bold text-[#111111] border-b border-gray-200 pb-2">
            Plagiarism &amp; Academic Originality Policy
          </h1>

          <div className="p-4 bg-gray-50 border border-gray-300 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#700070] shrink-0 mt-0.5" />
            <div>
              <strong className="text-gray-900 block mb-1">
                Zero Tolerance for Academic Dishonesty
              </strong>
              <p className="text-gray-700">
                Impulse Research Work strictly adheres to international anti-plagiarism guidelines. All submitted manuscripts are screened using licensed academic software (Drillbit / Turnitin / PlagiarismCheckerX) prior to peer review.
              </p>
            </div>
          </div>

          <section className="space-y-2">
            <h2 className="font-editorial text-sm sm:text-base font-bold text-[#700070]">
              1. Plagiarism Screening Software
            </h2>
            <p className="text-gray-700">
              We employ <strong>{companyInfo.plagiarismTool}</strong> for comprehensive diagnostic screening against billions of web pages, institutional dissertations, and academic publisher databases.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-editorial text-sm sm:text-base font-bold text-[#700070]">
              2. Acceptable Similarity Threshold
            </h2>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li><strong>Overall Similarity Index:</strong> Must not exceed <strong>10%</strong> (excluding standard references, bibliography, and statutory quotes).</li>
              <li><strong>Single-Source Limit:</strong> No individual source match should exceed <strong>2%</strong>.</li>
              <li>Direct verbatim quotations must be enclosed in quotation marks and cited with exact page numbers.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-editorial text-sm sm:text-base font-bold text-[#700070]">
              3. Types of Plagiarism Screened
            </h2>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li><strong>Direct / Verbatim Plagiarism:</strong> Transcribing portions of another work without quotation or attribution.</li>
              <li><strong>Paraphrasing Without Citation:</strong> Restating another author&apos;s thoughts without citing the original source.</li>
              <li><strong>Patchwriting:</strong> Superficial synonym replacement while retaining original sentence structures.</li>
              <li><strong>Self-Plagiarism:</strong> Re-using one&apos;s own previously published work without explicit cross-referencing.</li>
            </ul>
          </section>

          <div className="pt-4 border-t border-gray-200 flex items-center gap-4">
            <Link
              href="/submit"
              className="text-xs font-bold text-[#700070] hover:underline uppercase tracking-wider"
            >
              Submit Your Paper for Screening &rarr;
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
