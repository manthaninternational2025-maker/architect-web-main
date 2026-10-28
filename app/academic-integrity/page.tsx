import React from "react";
import Link from "next/link";
import { companyInfo } from "@/data/companyInfo";
import { Sidebar } from "@/components/layout/Sidebar";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ShieldCheck, CheckCircle2, AlertTriangle, FileText } from "lucide-react";

export const metadata = {
  title: "Academic Integrity Policy & Ethics Charter | Impulse Research Work",
  description: "Our institutional pledge against contract cheating, ghostwriting, and artificial plagiarism avoidance. Legitimate academic mentorship standards.",
};

export default function AcademicIntegrityPage() {
  return (
    <div className="academic-container py-8 lg:py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        <div className="lg:col-span-8 space-y-8">
          <article className="bg-white rounded border border-sand-200 p-6 sm:p-10 shadow-sm text-xs sm:text-sm text-academic-muted leading-relaxed space-y-6">
            <SectionHeader
              title="Academic Integrity Policy &amp; Ethics Charter"
              subtitle="Foundational principles upholding intellectual honesty, authentic scholarship, and genuine mentorship."
              badge="Ethics Charter"
            />

            <div className="p-4 bg-sand-50 rounded border border-sand-200 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-navy-950 block mb-1">
                  Our Institutional Pledge to Higher Education
                </strong>
                <p>
                  Impulse Research Work strictly denounces contract cheating, ghostwriting, paper mills, and deceptive plagiarism-evasion techniques. Our mission is to strengthen scholarly capacity through rigorous critique, developmental feedback, statistical guidance, and formatting assistance.
                </p>
              </div>
            </div>

            <section className="space-y-3">
              <h2 className="font-editorial text-base font-bold text-navy-950">
                1. What Impulse Research Work DOES Provide:
              </h2>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                  <span><strong>Methodological Mentoring:</strong> Helping researchers clarify research designs, operationalize constructs, and justify statistical sampling.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                  <span><strong>Substantive Editing:</strong> Correcting syntax, academic register, sentence rhythm, and passive ambiguity in author-drafted prose.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                  <span><strong>Statistical Consultation:</strong> Guiding researchers through data hygiene, SEM assumptions, syntax execution, and APA table formatting.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                  <span><strong>Ethical Similarity Diagnostics:</strong> Identifying inadvertent overlaps using licensed tools and teaching scholars legitimate scholarly synthesis.</span>
                </li>
              </ul>
            </section>

            <section className="space-y-3 pt-2">
              <h2 className="font-editorial text-base font-bold text-navy-950">
                2. What Impulse Research Work DOES NOT Provide:
              </h2>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span><strong>NO Ghostwriting / Proxy Writing:</strong> We will not write a doctoral thesis, synopsis, or term paper on behalf of a student.</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span><strong>NO Guaranteed Publication or Defense Approval:</strong> Academic acceptance is the sole prerogative of external university examiners.</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span><strong>NO &quot;AI Detector Bypass&quot; or Text Spinning:</strong> We never employ automated text spinners, synonym replacers, or deceptive formatting tricks.</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span><strong>NO Fabrication of Empirical Data:</strong> We will never generate fabricated questionnaire responses, falsified surveys, or manipulated p-values.</span>
                </li>
              </ul>
            </section>

            <section className="space-y-3 pt-2">
              <h2 className="font-editorial text-base font-bold text-navy-950">
                3. The Scholar&apos;s Ethical Responsibility
              </h2>
              <p>
                Scholars who utilize our advisory services must review all suggestions, accept or reject margin comments critically, and maintain full intellectual ownership of their research. By engaging Impulse Research Work, the researcher commits to upholding the research ethics policies of their respective university or academic institution.
              </p>
            </section>
          </article>
        </div>

        <div className="lg:col-span-4">
          <div className="sticky top-20">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
