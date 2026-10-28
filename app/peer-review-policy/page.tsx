import React from "react";
import { Sidebar } from "@/components/layout/Sidebar";

export const metadata = {
  title: "Peer Review Policy | Impulse Research Work",
  description: "Double-blind peer review policy, reviewer selection, and evaluation criteria.",
};

export default function PeerReviewPolicyPage() {
  return (
    <div className="academic-container py-6 sm:py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-white border border-sand-200 p-6 sm:p-8 rounded shadow-xs text-xs sm:text-sm text-academic-text space-y-6 leading-relaxed">
          <h1 className="text-xl sm:text-2xl font-editorial font-bold text-navy-950 border-b border-sand-200 pb-2">
            Peer Review Policy
          </h1>

          <section className="space-y-2">
            <h2 className="font-editorial text-base font-bold text-navy-950">
              1. Double-Blind Peer Review Process
            </h2>
            <p className="text-academic-muted">
              Impulse Research Work follows a rigorous double-blind peer review model for all research manuscripts. The identities of both the authors and the reviewers remain anonymous throughout the evaluation process to guarantee impartiality, intellectual rigor, and objective assessment.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-editorial text-base font-bold text-navy-950">
              2. Initial Desk Evaluation
            </h2>
            <p className="text-academic-muted">
              Upon receipt, manuscripts undergo an initial editorial screening by the Editor-in-Chief. Manuscripts lacking scholarly rigor, violating ethical standards, containing unoriginal content, or falling outside the journal scope will be desk-rejected without external review.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-editorial text-base font-bold text-navy-950">
              3. Review Criteria
            </h2>
            <p className="text-academic-muted">
              Independent peer reviewers evaluate submissions against the following core criteria:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-academic-muted">
              <li>Originality and contribution to the disciplinary body of knowledge.</li>
              <li>Methodological validity, theoretical foundation, and data robustness.</li>
              <li>Clarity of argumentation, logical flow, and academic writing quality.</li>
              <li>Compliance with ethical standards and citation authenticity.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="font-editorial text-base font-bold text-navy-950">
              4. Review Decision Framework
            </h2>
            <p className="text-academic-muted">
              Based on reviewer recommendations, the Editorial Board reaches one of four decisions:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-academic-muted">
              <li><strong>Accept without revision:</strong> The manuscript is accepted in its current form.</li>
              <li><strong>Minor Revisions:</strong> Minor textual or citation adjustments required.</li>
              <li><strong>Major Revisions:</strong> Substantial theoretical, empirical, or methodological refinement required before re-evaluation.</li>
              <li><strong>Reject:</strong> The manuscript does not meet the necessary academic standards.</li>
            </ul>
          </section>
        </div>

        <div className="lg:col-span-4">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
