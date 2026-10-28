import React from "react";
import Link from "next/link";
import { companyInfo } from "@/data/companyInfo";
import { Sidebar } from "@/components/layout/Sidebar";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SpecTable } from "@/components/ui/SpecTable";
import { ShieldCheck, BookOpen, Compass, Award, Users, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "About Us | Impulse Research Work",
  description: "Learn about Impulse Research Work, our academic advisory framework, research ethics standards, and mission to support doctoral and postgraduate scholars.",
};

export default function AboutPage() {
  return (
    <div className="academic-container py-8 lg:py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        {/* Main Content */}
        <div className="lg:col-span-8 space-y-10">
          <section className="bg-white rounded border border-sand-200 p-6 sm:p-8 shadow-sm">
            <SectionHeader
              title="About Impulse Research Work"
              subtitle="Ethical academic consultancy, substantive developmental editing, and empirical research mentoring."
              badge="Institutional Profile"
            />

            <div className="text-xs sm:text-sm text-academic-muted leading-relaxed space-y-4">
              <p>
                <strong>Impulse Research Work</strong> was established to provide rigorous, high-standard academic and research consultation to doctoral candidates, master&apos;s scholars, and university faculty. We recognize that high-level empirical scholarship is a demanding, iterative process requiring deep methodological insight, command of theoretical paradigms, and precise communication.
              </p>
              <p>
                Rather than treating academic support as a transactional service, we operate on a peer-consultancy model. Our senior methodologists, statisticians, and academic editors collaborate directly with researchers to critically assess research designs, strengthen empirical arguments, standardize bibliographic citations, and refine prose to international publication benchmarks.
              </p>
            </div>

            <div className="my-8 p-5 bg-sand-50 rounded border border-sand-200">
              <h3 className="font-editorial text-base font-bold text-navy-950 mb-2">
                Our Institutional Philosophy
              </h3>
              <p className="text-xs text-academic-muted leading-relaxed">
                We believe that the intellectual integrity of a researcher’s thesis or manuscript must never be compromised. We do not provide &quot;ready-made&quot; academic ghostwriting, nor do we claim impossible guarantees such as &quot;0% plagiarism&quot; or &quot;guaranteed university approval.&quot; We provide genuine scholarly guidance that empowers researchers to understand, defend, and advance their own work.
              </p>
            </div>

            <div>
              <h3 className="font-editorial text-base font-bold text-navy-950 mb-3">
                Key Institutional Specifications
              </h3>
              <SpecTable />
            </div>
          </section>

          {/* Section: Academic Integrity Charter */}
          <section id="standards" className="bg-white rounded border border-sand-200 p-6 sm:p-8 shadow-sm">
            <SectionHeader
              title="Academic Integrity & Ethics Charter"
              subtitle="Our strict principles regarding research authenticity and ethical mentorship"
              badge="Ethics & Compliance"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded border border-sand-200 bg-sand-50/50">
                <div className="flex items-center gap-2 text-navy-950 font-bold font-editorial text-sm mb-1.5">
                  <ShieldCheck className="w-4 h-4 text-orange-600" />
                  <span>Author Ownership</span>
                </div>
                <p className="text-xs text-academic-muted leading-relaxed">
                  The scholar remains the sole author of their thesis, paper, and ideas. We provide developmental feedback and linguistic polish without usurping authorship.
                </p>
              </div>

              <div className="p-4 rounded border border-sand-200 bg-sand-50/50">
                <div className="flex items-center gap-2 text-navy-950 font-bold font-editorial text-sm mb-1.5">
                  <BookOpen className="w-4 h-4 text-orange-600" />
                  <span>Transparent Diagnostics</span>
                </div>
                <p className="text-xs text-academic-muted leading-relaxed">
                  We use licensed plagiarism diagnostics (Turnitin / Drillbit) solely to identify inadvertent similarities and educate scholars on legitimate scholarly paraphrasing.
                </p>
              </div>

              <div className="p-4 rounded border border-sand-200 bg-sand-50/50">
                <div className="flex items-center gap-2 text-navy-950 font-bold font-editorial text-sm mb-1.5">
                  <Award className="w-4 h-4 text-orange-600" />
                  <span>Empirical Validity</span>
                </div>
                <p className="text-xs text-academic-muted leading-relaxed">
                  Our statistical guidance emphasizes genuine data transparency, verified assumption testing, and honest reporting of non-significant findings.
                </p>
              </div>

              <div className="p-4 rounded border border-sand-200 bg-sand-50/50">
                <div className="flex items-center gap-2 text-navy-950 font-bold font-editorial text-sm mb-1.5">
                  <Users className="w-4 h-4 text-orange-600" />
                  <span>Confidentiality Guarantee</span>
                </div>
                <p className="text-xs text-academic-muted leading-relaxed">
                  All shared documents, data files, and manuscripts are held in strict non-disclosure compliance and are never shared or indexed in public repositories.
                </p>
              </div>
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
