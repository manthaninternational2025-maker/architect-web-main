import React from "react";
import Link from "next/link";
import { companyInfo } from "@/data/companyInfo";
import { Sidebar } from "@/components/layout/Sidebar";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Lock, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Privacy & Scholar Confidentiality Policy | Impulse Research Work",
  description: "Strict privacy safeguards, manuscript non-disclosure agreements, and scholar data protection protocols.",
};

export default function PrivacyPage() {
  return (
    <div className="academic-container py-8 lg:py-10">
      <div className="grid grid-cols-12 gap-2.5 sm:gap-6">
        <div className="col-span-7 sm:col-span-8 space-y-4 sm:space-y-6">
          <article className="bg-white rounded border border-sand-200 p-6 sm:p-10 shadow-sm text-xs sm:text-sm text-academic-muted leading-relaxed space-y-6">
            <SectionHeader
              title="Scholar Confidentiality &amp; Privacy Policy"
              subtitle="Last updated: January 2026 • Impulse Research Work Ethics Framework"
              badge="Data Protection & NDA"
            />

            <section className="space-y-3">
              <h2 className="font-editorial text-base font-bold text-navy-950">
                1. Institutional Commitment to Scholar Privacy
              </h2>
              <p>
                Impulse Research Work operates under rigorous non-disclosure protocols designed to protect the intellectual property, draft manuscripts, proprietary research datasets, and personal contact coordinates of doctoral candidates, faculty, and scholars. We understand that academic research often contains unpublished findings, patent-sensitive methodologies, and novel hypotheses.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-editorial text-base font-bold text-navy-950">
                2. Manuscript &amp; Dataset Protection
              </h2>
              <p>
                Any file uploaded via our portal or shared via WhatsApp/email is handled under strict institutional confidentiality:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Your manuscripts are never submitted to public repositories or shared with unauthorized third parties.</li>
                <li>Plagiarism checks conducted via licensed tools are configured with repository storage disabled (&quot;no-repository&quot; setting) to prevent your draft from appearing in future similarity indexes.</li>
                <li>Statistical datasets (.sav, .csv, raw questionnaires) are processed exclusively by assigned analysts and deleted following project closure upon request.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-editorial text-base font-bold text-navy-950">
                3. Information We Collect
              </h2>
              <p>
                We collect personal information solely to provide academic consultation, generate project feasibility quotes, and maintain communication: Name, email address, WhatsApp telephone number, academic discipline, and project brief.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-editorial text-base font-bold text-navy-950">
                4. Contact Regarding Privacy
              </h2>
              <p>
                For questions regarding our privacy charter or to request complete deletion of project files post-consultation, please contact our Data Governance Officer via our official WhatsApp Helpline at <span className="font-mono font-semibold text-orange-600">{companyInfo.phone}</span>.
              </p>
            </section>
          </article>
        </div>

        <div className="col-span-5 sm:col-span-4">
          <div className="sticky top-20">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
