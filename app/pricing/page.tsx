import React from "react";
import Link from "next/link";
import { companyInfo } from "@/data/companyInfo";
import { Sidebar } from "@/components/layout/Sidebar";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CheckCircle2, MessageSquare, ArrowRight, ShieldCheck, FileText } from "lucide-react";

export const metadata = {
  title: "Academic Engagement & Pricing Framework | Impulse Research Work",
  description: "Transparent, milestone-based academic research consultancy tiers for research proposals, dissertation chapters, and statistical data modeling.",
};

export default function PricingPage() {
  const tiers = [
    {
      name: "Proposal & Synopsis Scoping",
      badge: "Foundational Tier",
      ideal: "PhD Aspirants & Postgraduate Scholars",
      scope: "Problem definition, conceptual model, and research design justification.",
      highlights: [
        "Research problem statement refinement",
        "Literature gap synthesis audit",
        "Conceptual & theoretical model mapping",
        "Sample size power calculation & design",
        "Institutional compliance check",
      ],
      turnaround: "5 – 7 Working Days",
    },
    {
      name: "Dissertation Developmental Review",
      badge: "Doctoral Milestone",
      ideal: "PhD Scholars at mid-stage or final pre-submission",
      scope: "Comprehensive chapter-by-chapter coherence, substantive editing, and thesis flow.",
      highlights: [
        "Exhaustive 5-chapter structure & transition critique",
        "Substantive language & academic tone polish",
        "Literature review synthesis audit",
        "Discussion vs empirical data alignment",
        "Detailed margin notes & revision report",
      ],
      turnaround: "10 – 16 Working Days",
    },
    {
      name: "Empirical Data Analysis Pipeline",
      badge: "Statistical Module",
      ideal: "Quantitative, Qualitative & Mixed-Methods Scholars",
      scope: "Complete statistical modeling, reliability, SEM, and APA-formatted table outputs.",
      highlights: [
        "Data hygiene, normality & outlier testing",
        "Hypothesis testing (Regression, ANOVA, SEM)",
        "SmartPLS / AMOS structural equation modeling",
        "APA 7th publication-ready tables & figures",
        "Methodology interpretation briefing",
      ],
      turnaround: "6 – 10 Working Days",
    },
    {
      name: "Journal Manuscript Readiness",
      badge: "Peer-Review Tier",
      ideal: "Faculty, Postdoctoral Fellows & Authors",
      scope: "Manuscript structuring for Scopus / Web of Science peer review expectations.",
      highlights: [
        "IMRAD structural flow optimization",
        "Journal scope match & guidelines audit",
        "Substantive language & academic register edit",
        "Academic cover letter addressed to Chief Editor",
        "Response-to-reviewers structural guide",
      ],
      turnaround: "4 – 6 Working Days",
    },
  ];

  return (
    <div className="academic-container py-8 lg:py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        {/* Main Content */}
        <div className="lg:col-span-8 space-y-8">
          <section className="bg-white rounded border border-sand-200 p-6 sm:p-8 shadow-sm">
            <SectionHeader
              title="Engagement &amp; Consultation Framework"
              subtitle="Transparent, milestone-based academic fee structure tailored to project scope and research complexity."
              badge="Consultancy Structure"
            />

            <div className="p-4 rounded bg-sand-50 border border-sand-200 text-xs text-academic-muted leading-relaxed mb-8">
              <strong className="text-navy-950 block mb-1">Our Pricing Philosophy:</strong>
              Because academic projects differ in length, theoretical density, data complexity, and institutional guidelines, Impulse Research Work does not use deceptive &quot;one-size-fits-all&quot; packages. We evaluate your manuscript draft or research brief individually and provide an exact, all-inclusive quotation prior to commencement.
            </div>

            <div className="space-y-6">
              {tiers.map((tier, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded border border-sand-200 bg-white hover:border-orange-500/60 transition-all shadow-sm"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-sand-100 pb-3 mb-4">
                    <div>
                      <span className="text-[11px] font-mono text-orange-600 font-semibold uppercase tracking-wider">
                        {tier.badge}
                      </span>
                      <h3 className="font-editorial text-lg font-bold text-navy-950 mt-0.5">
                        {tier.name}
                      </h3>
                    </div>
                    <span className="text-xs font-mono px-2.5 py-1 rounded bg-sand-100 text-navy-950 border border-sand-200 shrink-0">
                      Turnaround: {tier.turnaround}
                    </span>
                  </div>

                  <p className="text-xs text-academic-muted mb-4">
                    <strong className="text-navy-950">Target Scholars: </strong>
                    {tier.ideal} — {tier.scope}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-academic-text mb-6">
                    {tier.highlights.map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-orange-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-sand-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <span className="text-xs text-academic-muted">
                      Milestone-based payment • 100% Confidential
                    </span>
                    <div className="flex items-center gap-2.5 w-full sm:w-auto">
                      <Link
                        href={`/submit?service=${encodeURIComponent(tier.name)}`}
                        className="flex-1 sm:flex-none text-center px-4 py-2 rounded bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold transition-colors"
                      >
                        Request Scope Quote
                      </Link>
                      <a
                        href={`https://wa.me/${companyInfo.whatsappRaw}?text=${encodeURIComponent(`Hello Impulse Research Work, I would like to inquire about pricing for ${tier.name}.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 rounded border border-navy-950 text-navy-950 hover:bg-navy-950 hover:text-white text-xs font-semibold transition-colors inline-flex items-center gap-1.5"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-orange-600" />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4">
          <div className="sticky top-20">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
