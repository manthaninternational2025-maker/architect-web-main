import React from "react";
import Link from "next/link";
import { companyInfo } from "@/data/companyInfo";
import { Sidebar } from "@/components/layout/Sidebar";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GraduationCap, Award, BookOpen, ShieldCheck, MessageSquare } from "lucide-react";

export const metadata = {
  title: "Our Academic Experts & Methodologists | Impulse Research Work",
  description: "Meet the doctoral-level research methodologists, senior biostatisticians, and academic editors behind Impulse Research Work.",
};

export default function ExpertsPage() {
  const expertPanels = [
    {
      title: "Doctoral Methodology & Research Design Directorate",
      lead: "Senior Methodological Advisors (Ph.D. Holders)",
      disciplines: "Social Sciences, Humanities, Management, Education, Behavioral Sciences",
      focus: "Specializing in ontological-epistemological alignment, qualitative thematic coding (Braun & Clarke), case study frameworks, conceptual model mapping, and doctoral committee defense preparation.",
    },
    {
      title: "Empirical & Quantitative Statistical Modeling Unit",
      lead: "Senior Biostatisticians & Quantitative Analysts",
      disciplines: "Economics, Public Health, Psychology, Marketing, Applied Sciences",
      focus: "Specializing in Covariance-Based SEM (AMOS), Partial Least Squares SEM (SmartPLS 4), multivariate regression, G*Power sampling justification, hierarchical linear modeling, and rigorous APA table compilation.",
    },
    {
      title: "Substantive Academic Editing & Peer-Review Directorate",
      lead: "Disciplinary Academic Editors & Style Manual Specialists",
      disciplines: "All Scholarly Disciplines",
      focus: "Specializing in substantive structural editing, peer-review readiness audits, IMRAD format optimization, citation integrity (APA 7th, Harvard, IEEE, Chicago), and Turnitin/Drillbit similarity remediation.",
    },
  ];

  return (
    <div className="academic-container py-8 lg:py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        {/* Main Content */}
        <div className="lg:col-span-8 space-y-8">
          <section className="bg-white rounded border border-sand-200 p-6 sm:p-8 shadow-sm">
            <SectionHeader
              title="Academic Advisory Board &amp; Methodologists"
              subtitle="Interdisciplinary doctoral scholars, biostatisticians, and publishing editors dedicated to research rigor."
              badge="Faculty & Advisory"
            />

            <div className="text-xs sm:text-sm text-academic-muted leading-relaxed space-y-4 mb-8">
              <p>
                At <strong>Impulse Research Work</strong>, every research project is reviewed by disciplinary specialists with proven doctoral credentials and peer-reviewed publishing records. Our advisors have supervised, reviewed, and published extensively across Scopus, Web of Science, and UGC-CARE indexed journals.
              </p>
              <p>
                We maintain an interdisciplinary panel structure ensuring that your dissertation, proposal, or dataset is matched with an advisor possessing domain-specific expertise in your chosen theoretical paradigm.
              </p>
            </div>

            <div className="space-y-6">
              {expertPanels.map((panel, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded border border-sand-200 bg-sand-50/50 hover:border-orange-500/50 transition-colors"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded bg-navy-950 text-orange-500 flex items-center justify-center shrink-0 mt-0.5">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-editorial text-base sm:text-lg font-bold text-navy-950">
                        {panel.title}
                      </h3>
                      <span className="text-xs font-semibold text-orange-600 block mt-0.5">
                        {panel.lead}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs text-academic-muted pt-2 border-t border-sand-200">
                    <div>
                      <strong className="text-navy-950">Disciplinary Scope: </strong>
                      <span>{panel.disciplines}</span>
                    </div>
                    <div>
                      <strong className="text-navy-950">Methodological Specialization: </strong>
                      <span>{panel.focus}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-5 rounded bg-navy-950 text-white text-xs flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <span className="font-editorial font-bold text-sm block">
                  Discuss Your Topic with a Specialized Methodologist
                </span>
                <span className="text-gray-300">
                  Connect via WhatsApp desk for confidential advisory consultation.
                </span>
              </div>
              <a
                href={companyInfo.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 px-4 py-2.5 rounded bg-orange-500 hover:bg-orange-600 text-white font-semibold transition-colors inline-flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Advisory Desk</span>
              </a>
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
