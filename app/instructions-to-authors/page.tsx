"use client";

import React from "react";
import { useJournalData } from "@/context/JournalDataContext";
import { Sidebar } from "@/components/layout/Sidebar";

export default function InstructionsToAuthorsPage() {
  const { settings } = useJournalData();

  const journalTitle = settings?.journalTitle || "Manthan: International Multidisciplinary Journal of Social Inquiry";
  const email = settings?.email || "manthaninternational2025@gmail.com";

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Content: Instruction to Authors (Matching Reference Screenshot 1 Exactly) */}
        <div className="col-span-1 lg:col-span-8">
          <div className="border border-gray-400 bg-white p-5 sm:p-7 text-[#222222] font-sans text-xs sm:text-[13px] leading-relaxed space-y-4">
            {/* Page Heading */}
            <h1 className="text-xl sm:text-2xl text-[#222222] font-normal mb-5">
              Instruction to Authors
            </h1>

            {/* Scope Intro */}
            <p className="leading-relaxed">
              <strong><em>{journalTitle}</em></strong> publishes research articles, communications, review papers and book reviews.
            </p>

            <div className="space-y-0.5 pl-1">
              <p>a) Research Articles</p>
              <p>b) Rapid Communications</p>
              <p>c) Reviews</p>
            </div>

            <p className="leading-relaxed">
              Please read the following instructions carefully or any query, contact us at:
            </p>
            <p className="-mt-2">
              <a
                href={`mailto:${email}`}
                className="text-[#700070] underline hover:text-[#550055]"
              >
                {email}
              </a>
            </p>

            <p className="leading-relaxed">
              Manuscripts should be prepared as word documents in Times New Roman (font size should be 12) on A4 size with a margin of 2 cm of all four sides. The manuscript should be typed double-spaced including references and tables also.
            </p>
            <p className="leading-relaxed">
              All figures and tables should be at appropriate place in the text. The manuscript should be in the following order:
            </p>

            {/* 1. Title Page */}
            <div className="space-y-1">
              <h2 className="font-bold text-[#111111]">1. Title Page:</h2>
              <p className="leading-relaxed">
                <strong>1.1. Title:</strong> The title should be relatively short but informative. Title should be written in font size 14, Caps and Bold.
              </p>
              <p className="leading-relaxed">
                <strong>1.2. Name(s) of author(s):</strong> A list of all authors of the paper should be prepared. It will contain full first name, initial(s) for middle name(s), full last name and should be written in font size 10. Corresponding author should be marked with *.
              </p>
              <p className="leading-relaxed">
                <strong>1.3. Name and address of workplace(s):</strong> Authors&apos; affiliations should be indicated in this section.
              </p>
              <p className="leading-relaxed">
                <strong>1.4. Personal e-mail address(es):</strong> At least one e-mail address is needed. It will be used as the corresponding author&apos;s email address in all contacts with the authors.
              </p>
            </div>

            {/* 2. Abstract */}
            <div className="space-y-1">
              <h2 className="font-bold text-[#111111]">2. Abstract:</h2>
              <p className="leading-relaxed">
                An abstract must accompany every article. It should be a brief summary about the significant information of the main paper. It should be informative and not only present the general scope of the paper but also indicate the main results and conclusions. An abstract should not normally exceed 250 words.
              </p>
            </div>

            {/* 3. Keywords */}
            <div className="space-y-1">
              <h2 className="font-bold text-[#111111]">3. Keywords:</h2>
              <p className="leading-relaxed">
                List of all keywords proposed by the authors, separated by commas. Up to 5 key terms can be selected. We would suggest avoid repeating the title.
              </p>
            </div>

            {/* 4. Introduction/Background */}
            <div className="space-y-1">
              <h2 className="font-bold text-[#111111]">4. Introduction/Background:</h2>
              <p className="leading-relaxed">
                Present the subject of paper clearly, indicate the scope of the subject, and present the goals of paper, novelty of research work and finally the organization of paper.
              </p>
            </div>

            {/* 5. Materials and Methods */}
            <div className="space-y-1">
              <h2 className="font-bold text-[#111111]">5. Materials and Methods:</h2>
              <p className="leading-relaxed">
                It should contain information about the materials and the methods adopted to carry out the research work like animals, chemicals and animal ethical committee permission, software used and procedures followed etc. The units and dimensions should be expressed according to the metric system and SI units.
              </p>
            </div>

            {/* 6. Results and Discussion */}
            <div className="space-y-1">
              <h2 className="font-bold text-[#111111]">6. Results and Discussion:</h2>
              <p className="leading-relaxed">
                It may be combined or kept separate and may be further divided into subsections. This section should not contain technical details. Abbreviations and acronyms should be used sparingly and consistently. Where they first appear in the text, they should be defined; authors may also explain large numbers of abbreviations and acronyms in a footnote on the first page.
              </p>
            </div>

            {/* 7. Conclusion */}
            <div className="space-y-1">
              <h2 className="font-bold text-[#111111]">7. Conclusion:</h2>
              <p className="leading-relaxed">
                It should be representing the summary of the important findings.
              </p>
            </div>

            {/* 8. Acknowledgments */}
            <div className="space-y-1">
              <h2 className="font-bold text-[#111111]">8. Acknowledgments:</h2>
              <p className="leading-relaxed">
                Acknowledgments of people, grants, funds, etc. should be placed in a separate section before the reference list. The names of funding organizations should be written in full.
              </p>
            </div>

            {/* 9. References */}
            <div className="space-y-2">
              <h2 className="font-bold text-[#111111]">9. References:</h2>
              <p className="leading-relaxed">
                The references should be represented as large brackets e.g.[3] in the text. The references pattern should be in the following manner:
              </p>

              <div className="space-y-2 pt-1">
                <p className="font-bold text-[#111111]">For journal article</p>
                <p className="leading-relaxed">
                  Author&apos;s Surname, Initials. (Year). Title. Journal, Volume(Issue): Page No.
                </p>
                <p className="italic leading-relaxed">
                  Lobo, R., Dashora, N., Sodde, V., &amp; Prabhu, K. S. (2010). Anticancer Activity of Dendrophthoe Falcata on Ehrlich&apos;s Ascites Carcinoma Treated Mice. Journal of Pharmacy and Pharmacology, 62(10):1243-1249.
                </p>

                <p className="font-bold text-[#111111] pt-2">For a Book</p>
                <p className="leading-relaxed">
                  Author&apos;s Surname, Initials. (Year). Title, Publisher, Place of publication, Edition, Page No.
                </p>
                <p className="italic leading-relaxed">
                  Chatwal, G. R., &amp; Anand, S. K. (1979). Instrumental methods of chemical analysis. Himalaya Pub, 5th Ed., 103-109.
                </p>
              </div>
            </div>

            {/* 10. Article Processing Charges */}
            <div className="space-y-2 pt-1">
              <h2 className="font-bold text-[#111111]">10. Article Processing Charges:</h2>
              <p className="leading-relaxed">
                Upon acceptance, Authors are required to pay a nominal pre-press charges is to be paid. Article processing charges (APCs) are associated with only accepted articles to cover the costs of making the final version of the manuscript freely available via open access.
              </p>
              <div className="pt-1 space-y-0.5">
                <p>For Indian Authors: 1200 Rs.</p>
                <p>For Foreign Authors: 30 USD</p>
              </div>
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
