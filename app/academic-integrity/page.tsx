"use client";

import React from "react";
import { useJournalData } from "@/context/JournalDataContext";
import { Sidebar } from "@/components/layout/Sidebar";

export default function AcademicIntegrityPage() {
  const { ethics, settings } = useJournalData();

  const journalTitle = settings?.journalTitle || "Manthan: International Multidisciplinary Journal of Social Inquiry";

  const authorBullets = ethics?.authorResponsibilities || [
    "Results should be presented by researchers in clear and honest way, without any false or inappropriate data manipulation.",
    "Methods and procedures adopted during any research should be described clearly and unambiguously so that their findings can be confirmed by others.",
    "Submitted work should be original, is not plagiarized, and has not been published elsewhere.",
    "Authors will be solely responsible for submitted and published work.",
    "The authorship of research publications should accurately reflect individuals' contributions to the work and its reporting.",
    "Funding sources and relevant conflicts of interest should be disclosed.",
  ];

  const editorBullets = ethics?.editorResponsibilities || [
    "Fair, correct and unbiased decisions should be made by editors, free from commercial consideration to ensure a fair and appropriate peer review process",
    "Editors should ensure complete transparency and honest reporting.",
    "Editors should maintain the reliability of the published record by suggesting corrections when needed and rejecting suspected or alleged research and publication misconduct",
    "Editors should critically assess the ethical issues regarding studies in humans and animals should be considered.",
    "Editors should observe conflict of interest during the review process and should have appropriate policies in place for handling editorial conflicts of interest",
  ];

  const reviewerBullets = ethics?.reviewerResponsibilities || [
    "Written, unbiased feedback should be provided in a timely manner.",
    "Personal comments or criticism should be avoided.",
    "Confidentiality of the review process should be maintained.",
    "Any observed conflict of interest during the review process must be communicated to the Editor",
    "Any information that may be the reason for the rejection of publication of a manuscript must be communicated to the Editor.",
  ];

  const publisherBullets = ethics?.publisherResponsibilities || [
    `The editor of ${journalTitle} is responsible for editorial content and managing content-related processes.`,
    "It is the publisher's responsibility to promptly release corrections or retractions after the discovery of a significant error or scientific inaccuracy in a published work.",
  ];

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Content: Publication Ethics (Matching Reference Screenshot 1 Exactly) */}
        <div className="col-span-1 lg:col-span-8">
          <div className="border border-gray-400 bg-white p-5 sm:p-7 text-[#222222] font-sans text-xs sm:text-[13px] leading-relaxed space-y-4">
            {/* Page Heading */}
            <h1 className="text-xl sm:text-2xl text-[#222222] font-normal mb-5">
              publication ethics
            </h1>

            {/* Intro paragraph */}
            <p className="leading-relaxed">
              Publication ethics of <strong>{journalTitle}</strong> is mainly based on the Code of Conduct and Best-Practice Guidelines for Journal Editors (Committee on Publication Ethics, 2011).
            </p>

            {/* Author Responsibilities */}
            <div className="space-y-1.5 pt-1">
              <h2 className="font-bold text-[#111111]">
                Author Responsibilities
              </h2>
              <ul className="space-y-1 text-[#222222]">
                {authorBullets.map((item: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Editor Roles and Responsibilities */}
            <div className="space-y-1.5 pt-1">
              <h2 className="font-bold text-[#111111]">
                Editor Roles and Responsibilities
              </h2>
              <ul className="space-y-1 text-[#222222]">
                {editorBullets.map((item: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Reviewers Responsibilities */}
            <div className="space-y-1.5 pt-1">
              <h2 className="font-bold text-[#111111]">
                Reviewers Responsibilities
              </h2>
              <ul className="space-y-1 text-[#222222]">
                {reviewerBullets.map((item: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Publisher's Responsibilities */}
            <div className="space-y-1.5 pt-1">
              <h2 className="font-bold text-[#111111]">
                Publisher&apos;s Responsibilities
              </h2>
              <ul className="space-y-1 text-[#222222]">
                {publisherBullets.map((item: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* References */}
            <div className="space-y-1 pt-1">
              <h2 className="font-bold text-[#111111]">
                References
              </h2>
              <p className="text-[#222222] leading-relaxed break-all">
                Committee on Publication Ethics (COPE) (2011, March 7). Code of Conduct and Best-Practice Guidelines for Journal Editors. Retrieved from{" "}
                <a
                  href="http://publicationethics.org/files/Code_of_conduct_for_journal_editors_Mar11.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#700070] hover:underline"
                >
                  http://publicationethics.org/files/Code_of_conduct_for_journal_editors_Mar11.pdf
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="col-span-1 lg:col-span-4">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
