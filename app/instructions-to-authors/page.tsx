"use client";

import React from "react";
import Link from "next/link";
import { useJournalData } from "@/context/JournalDataContext";
import { Sidebar } from "@/components/layout/Sidebar";

export default function InstructionsToAuthorsPage() {
  const { instructions, settings } = useJournalData();

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Author Instructions (Matching Reference Screenshot) */}
        <div className="col-span-1 lg:col-span-8 text-xs sm:text-sm text-gray-800 space-y-4 leading-relaxed font-sans">
          <h1 className="text-xl sm:text-2xl font-editorial font-bold text-[#111111] border-b border-gray-200 pb-2">
            Instruction to Authors
          </h1>

          <p className="text-gray-900 font-medium">
            <strong>{settings.journalTitle}</strong> publishes research articles, communications, review papers and book reviews.
          </p>

          <ul className="list-none pl-2 space-y-0.5 text-gray-800 font-medium">
            <li>a) Research Articles</li>
            <li>b) Rapid Communications</li>
            <li>c) Reviews</li>
          </ul>

          <p className="text-gray-700">
            Please read the following instructions carefully or any query, contact us at:{" "}
            <a href={`mailto:${settings.email}`} className="text-[#700070] font-mono font-bold hover:underline break-all">
              {settings.email}
            </a>
          </p>

          <p className="text-gray-700">
            Manuscripts should be prepared as word documents in Times New Roman (font size should be 12) on A4 size with a margin of 2 cm of all four sides. The manuscript should be typed double-spaced including references and tables also. All figures and tables should be at appropriate place in the text. The manuscript should be in the following order:
          </p>

          <div className="space-y-3.5 pt-2">
            {/* 1. Title Page */}
            <div>
              <h2 className="font-bold text-gray-900 text-sm sm:text-base">
                1. Title Page:
              </h2>
              <div className="pl-3 space-y-1 text-gray-700 mt-1">
                <p><strong>1.1. Title:</strong> The title should be relatively short but informative. Title should be written in font size 14, Caps and Bold.</p>
                <p><strong>1.2. Name(s) of author(s):</strong> A list of all authors of the paper should be prepared. It will contain full first name, initial(s) for middle name(s), full last name and should be written in font size 10. Corresponding author should be marked with *.</p>
                <p><strong>1.3. Name and address of workplace(s):</strong> Authors&apos; affiliations should be indicated in this section.</p>
                <p><strong>1.4. Personal e-mail address(es):</strong> At least one e-mail address is needed. It will be used as the corresponding author&apos;s email address in all contacts with the authors.</p>
              </div>
            </div>

            {/* 2. Abstract */}
            <div>
              <h2 className="font-bold text-gray-900 text-sm sm:text-base">
                2. Abstract:
              </h2>
              <p className="pl-3 text-gray-700 mt-1">
                An abstract must accompany every article. It should be a brief summary about the significant information of the main paper. It should be informative and not only present the general scope of the paper but also indicate the main results and conclusions. An abstract should not normally exceed 250 words.
              </p>
            </div>

            {/* 3. Keywords */}
            <div>
              <h2 className="font-bold text-gray-900 text-sm sm:text-base">
                3. Keywords:
              </h2>
              <p className="pl-3 text-gray-700 mt-1">
                List of all keywords proposed by the authors, separated by commas. Up to 5 key terms can be selected. We would suggest avoid repeating the title.
              </p>
            </div>

            {/* 4. Introduction/Background */}
            <div>
              <h2 className="font-bold text-gray-900 text-sm sm:text-base">
                4. Introduction/Background:
              </h2>
              <p className="pl-3 text-gray-700 mt-1">
                Present the subject of paper clearly, indicate the scope of the subject, and present the goals of paper, novelty of research work and finally the organization of paper.
              </p>
            </div>

            {/* 5. Materials and Methods */}
            <div>
              <h2 className="font-bold text-gray-900 text-sm sm:text-base">
                5. Materials and Methods:
              </h2>
              <p className="pl-3 text-gray-700 mt-1">
                It should contain information about the materials and the methods adopted to carry out the research work like subjects, procedures, software used, and ethical committee permissions where applicable. The units and dimensions should be expressed according to the metric system and SI units.
              </p>
            </div>

            {/* 6. Results and Discussion */}
            <div>
              <h2 className="font-bold text-gray-900 text-sm sm:text-base">
                6. Results and Discussion:
              </h2>
              <p className="pl-3 text-gray-700 mt-1">
                It may be combined or kept separate and may be further divided into subsections. This section should not contain technical details. Abbreviations and acronyms should be used sparingly and consistently. Where they first appear in the text, they should be defined; authors may also explain large numbers of abbreviations and acronyms in a footnote on the first page.
              </p>
            </div>

            {/* 7. Conclusion */}
            <div>
              <h2 className="font-bold text-gray-900 text-sm sm:text-base">
                7. Conclusion:
              </h2>
              <p className="pl-3 text-gray-700 mt-1">
                It should be representing the summary of the important findings.
              </p>
            </div>

            {/* 8. Acknowledgments */}
            <div>
              <h2 className="font-bold text-gray-900 text-sm sm:text-base">
                8. Acknowledgments:
              </h2>
              <p className="pl-3 text-gray-700 mt-1">
                Acknowledgments of people, grants, funds, etc. should be placed in a separate section before the reference list. The names of funding organizations should be written in full.
              </p>
            </div>

            {/* 9. References */}
            <div>
              <h2 className="font-bold text-gray-900 text-sm sm:text-base">
                9. References:
              </h2>
              <div className="pl-3 space-y-1.5 text-gray-700 mt-1">
                <p>
                  The references should be represented as large brackets e.g. [3] in the text. The references pattern should be in the following manner:
                </p>
                <div className="p-2.5 bg-gray-50 border border-gray-200 rounded text-xs space-y-1">
                  <p className="font-semibold text-gray-900">For Journal article:</p>
                  <p className="font-mono text-gray-600">Author&apos;s Surname, Initials. (Year). Title. Journal, Volume(Issue): Page No.</p>
                  <p className="italic text-gray-700">Example: Lobo, R., Dashora, N., Sodde, V., &amp; Prabhu, K. S. (2010). Anticancer Activity of Dendrophthoe Falcata on Ehrlich&apos;s Ascites Carcinoma Treated Mice. Journal of Pharmacy and Pharmacology, 62(10):1248-1249.</p>

                  <p className="font-semibold text-gray-900 pt-1 border-t border-gray-200">For a Book:</p>
                  <p className="font-mono text-gray-600">Author&apos;s Surname, Initials. (Year). Title, Publisher, Place of publication, Edition, Page No.</p>
                  <p className="italic text-gray-700">Example: Chatwal, G. R., &amp; Anand, S. K. (1979). Instrumental methods of chemical analysis. Himalaya Pub, 5th Ed., 103-109.</p>
                </div>
              </div>
            </div>

            {/* 10. Article Processing Charges */}
            <div>
              <h2 className="font-bold text-gray-900 text-sm sm:text-base">
                10. Article Processing Charges:
              </h2>
              <div className="pl-3 space-y-1 text-gray-700 mt-1">
                <p>
                  Upon acceptance, Authors are required to pay a nominal pre-press charge. Article processing charges (APCs) are associated with only accepted articles to cover the costs of making the final version of the manuscript freely available via open access.
                </p>
                <div className="font-bold text-gray-900 space-y-0.5 pt-1">
                  <p>For Indian Authors: 1200 Rs.</p>
                  <p>For Foreign Authors: 30 USD</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="pt-4 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <Link
              href="/submit"
              className="inline-flex items-center justify-center px-5 py-2.5 bg-[#700070] hover:bg-[#550055] text-white font-bold text-xs uppercase tracking-wider rounded transition-colors text-center w-full sm:w-auto shadow-xs"
            >
              Submit Your Manuscript Now &rarr;
            </Link>

            <span className="text-xs text-gray-600">
              Email inquiries:{" "}
              <a href={`mailto:${settings.email}`} className="font-mono text-[#700070] hover:underline font-bold break-all">
                {settings.email}
              </a>
            </span>
          </div>
        </div>

        {/* Right Column: Sidebar */}
        <div className="col-span-1 lg:col-span-4">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
