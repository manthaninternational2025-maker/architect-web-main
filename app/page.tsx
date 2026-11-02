"use client";

import React from "react";
import { useJournalData } from "@/context/JournalDataContext";
import { Sidebar } from "@/components/layout/Sidebar";
import { SpecTable } from "@/components/ui/SpecTable";
import { Bell, Mail } from "lucide-react";

export default function HomePage() {
  const { settings, announcement, homepage } = useJournalData();

  return (
    <div className="w-full space-y-4">
      {/* -------------------------------------------------------------
          CALL FOR PAPERS ANNOUNCEMENT BANNER (From JournalDataContext)
         ------------------------------------------------------------- */}
      {announcement.active && (
        <div className="bg-purple-50 border border-purple-200 p-3 rounded-none flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#700070] shrink-0 animate-bounce" />
            <span className="font-bold text-[#700070]">{announcement.badge}:</span>
            <span className="text-gray-800">{announcement.text}</span>
          </div>
          <a
            href={`mailto:${announcement.contactEmail || settings.email}`}
            className="inline-flex items-center gap-1 font-bold text-[#700070] hover:underline shrink-0 bg-white px-2.5 py-1 border border-purple-200"
          >
            <Mail className="w-3.5 h-3.5 text-[#700070]" />
            <span>{announcement.contactEmail || settings.email}</span>
          </a>
        </div>
      )}


      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* -------------------------------------------------------------
            LEFT COLUMN (Main Content Area — Exactly like Reference)
           ------------------------------------------------------------- */}
        <div className="col-span-1 lg:col-span-8 space-y-4">
          <h1 className="text-xl sm:text-2xl font-editorial font-bold text-[#111111] border-b border-gray-200 pb-2">
            Home
          </h1>

          <p className="text-xs sm:text-sm text-justify text-gray-800 leading-relaxed font-sans">
            <strong>{settings.journalTitle} (ISSN: {settings.issn})</strong> {homepage.introP1.replace(/^[^a-zA-Z0-9]+/, "")}
          </p>

          <p className="text-xs sm:text-sm text-justify text-gray-800 leading-relaxed font-sans">
            {homepage.introP2}
          </p>

          {/* Journal Particulars Table (Dynamic from Settings) */}
          <SpecTable />

          {/* -------------------------------------------------------------
              ABOUT THE JOURNAL (Dynamic from Homepage State)
             ------------------------------------------------------------- */}
          <section className="pt-2 space-y-2">
            <h2 className="text-base font-editorial font-bold text-[#700070] border-b border-gray-200 pb-1">
              About the Journal
            </h2>
            <p className="text-xs sm:text-sm text-justify text-gray-800 leading-relaxed font-sans">
              {homepage.aboutText}
            </p>
          </section>

          {/* -------------------------------------------------------------
              PUBLICATION POLICY (Dynamic from Homepage State)
             ------------------------------------------------------------- */}
          <section className="pt-3 space-y-2">
            <h2 className="text-base font-editorial font-bold text-[#700070] border-b border-gray-200 pb-1">
              Publication Policy
            </h2>

            <p className="text-xs sm:text-sm text-justify text-gray-800 leading-relaxed font-sans">
              {homepage.policyText}
            </p>

            <p className="text-xs sm:text-sm text-justify text-gray-800 leading-relaxed font-sans">
              Research involving human participants, animals, or any regulated organisms must comply with applicable Institutional, National, or International ethical guidelines. Where required, authors must obtain approval from an appropriate ethics committee and include a clear statement of ethical approval and compliance within the manuscript.
            </p>

            <p className="text-xs sm:text-sm text-justify text-gray-800 leading-relaxed font-sans">
              All research submitted to <strong>{settings.journalTitle}</strong> must be conducted within an appropriate ethical framework. If there is reason to believe that the research has not adhered to accepted ethical standards, the Editor-in-Chief, <strong>{settings.editorInChief}</strong>, and Editorial Board reserve the right to reject the manuscript.
            </p>

            <p className="text-xs sm:text-sm text-justify text-gray-800 leading-relaxed font-sans">
              All original research articles, review papers, case studies, short communications, and other eligible manuscript types submitted to <strong>{settings.journalTitle}</strong> undergo a rigorous peer review process conducted by qualified subject experts to ensure academic quality, originality, and integrity.
            </p>

            <p className="text-xs sm:text-sm text-justify text-gray-800 leading-relaxed font-sans">
              Authors must ensure that all text, tables, figures, illustrations, and other copyrighted materials reproduced from other sources are properly acknowledged and cited. The journal follows a strict policy against plagiarism, and all submitted manuscripts are screened using {settings.plagiarismTool}.
            </p>

            <p className="text-xs sm:text-sm text-justify text-gray-800 leading-relaxed font-sans italic text-gray-600">
              All rights relating to the publication, distribution, and archival of accepted articles are reserved by <strong>{settings.journalTitle}</strong>, published by <strong>{settings.publisher}</strong>, subject to the journal&apos;s Open Access and Copyright Policy.
            </p>
          </section>

          {/* -------------------------------------------------------------
              DISCIPLINARY SCOPE & SUBTOPICS (Matching Reference Screenshot)
             ------------------------------------------------------------- */}
          <section className="pt-3 space-y-2">
            <h2 className="text-base font-editorial font-bold text-[#700070] border-b border-gray-200 pb-1">
              Disciplinary Scope &amp; Thematic Areas
            </h2>
            <p className="text-xs sm:text-sm text-justify text-gray-800 leading-relaxed font-sans">
              <strong>{settings.journalTitle} (ISSN: {settings.issn})</strong> covers a wide range of topics within the fields of social sciences and humanities. While the specific subtopics may vary depending on the focus of individual articles and issues, here are some common subtopics that you might find in the journal:
            </p>
            <ol className="list-decimal pl-5 space-y-1.5 text-xs sm:text-sm text-gray-800 leading-relaxed font-sans">
              <li><strong>Interdisciplinary Studies:</strong> Articles that explore the integration of different disciplines within the social sciences and humanities to address complex issues.</li>
              <li><strong>Cultural Studies:</strong> Examination of culture, including cultural norms, practices, and their impact on society.</li>
              <li><strong>Social Psychology:</strong> Research on individual and group behavior, attitudes, and perceptions in a social context.</li>
              <li><strong>Environmental Humanities:</strong> Exploration of the relationship between humans and the environment, including topics like environmental ethics, sustainability, and climate change.</li>
              <li><strong>Gender and Sexuality Studies:</strong> Research on gender identity, sexuality, and the social construction of gender roles.</li>
              <li><strong>History and Historiography:</strong> Articles that delve into historical events, their interpretation, and the methods used to study the past.</li>
              <li><strong>Literature and Literary Theory:</strong> Analysis of literary works, genres, and literary criticism.</li>
              <li><strong>Political Science:</strong> Research on political systems, governance, international relations, and political ideologies.</li>
              <li><strong>Philosophy:</strong> Discussions of philosophical ideas and their applications to contemporary issues.</li>
              <li><strong>Economics and Economic History:</strong> Studies on economic theories, policies, and historical economic developments.</li>
            </ol>
          </section>
        </div>

        {/* -------------------------------------------------------------
            RIGHT COLUMN (Sidebar — Dynamic from Admin)
           ------------------------------------------------------------- */}
        <div className="col-span-1 lg:col-span-4">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
