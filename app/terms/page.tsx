import React from "react";
import Link from "next/link";
import { companyInfo } from "@/data/companyInfo";
import { Sidebar } from "@/components/layout/Sidebar";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata = {
  title: "Terms of Academic Consultation | Impulse Research Work",
  description: "Terms and conditions governing academic advisory, developmental editing, and research consultation.",
};

export default function TermsPage() {
  return (
    <div className="academic-container py-8 lg:py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        <div className="lg:col-span-8 space-y-8">
          <article className="bg-white rounded border border-sand-200 p-6 sm:p-10 shadow-sm text-xs sm:text-sm text-academic-muted leading-relaxed space-y-6">
            <SectionHeader
              title="Terms of Academic Consultation"
              subtitle="Guidelines for engaging our research advisory and developmental editing services."
              badge="Consultation Terms"
            />

            <section className="space-y-3">
              <h2 className="font-editorial text-base font-bold text-navy-950">
                1. Scope of Consultation
              </h2>
              <p>
                Impulse Research Work provides research advisory services, substantive academic proofreading, statistical methodology guidance, and institutional formatting alignment. All consultations are intended as supportive educational guidance for researchers.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-editorial text-base font-bold text-navy-950">
                2. Academic Authorship &amp; Ethical Boundaries
              </h2>
              <p>
                The scholar retains sole authorial accountability for all academic submissions made to their university, doctoral defense panel, or academic journal publisher. Our advisory role consists of commentary, structural review, and technical editing; we do not write academic dissertations on behalf of scholars.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-editorial text-base font-bold text-navy-950">
                3. Milestone Commitments &amp; Revisions
              </h2>
              <p>
                Project turnarounds are determined mutually prior to project initiation. Each advisory tier includes iterative rounds of review based on supervisor feedback within the agreed scope. Requests introducing completely new research hypotheses, altered datasets, or substantially shifted scopes are subject to re-scoping.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-editorial text-base font-bold text-navy-950">
                4. Disclaimers Regarding Independent Academic Outcomes
              </h2>
              <p>
                While Impulse Research Work applies rigorous academic standards to every review, doctoral thesis acceptance, viva voce defense evaluation, and peer-reviewed journal acceptance remain the sole independent purview of university committees and peer reviewers. We do not provide false guarantees of acceptance.
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
