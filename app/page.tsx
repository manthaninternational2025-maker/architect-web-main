import React from "react";
import Link from "next/link";
import { companyInfo } from "@/data/companyInfo";
import { resources } from "@/data/resources";
import { Sidebar } from "@/components/layout/Sidebar";
import { SpecTable } from "@/components/ui/SpecTable";
import { FileText, Calendar, User, ArrowRight, Bell, Mail } from "lucide-react";

export default function HomePage() {
  return (
    <div className="w-full space-y-4">
      {/* -------------------------------------------------------------
          CALL FOR PAPERS ANNOUNCEMENT BANNER (From Manthan HTML)
         ------------------------------------------------------------- */}
      <div className="bg-purple-50 border border-purple-200 p-3 rounded-none flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-[#700070] shrink-0 animate-bounce" />
          <span className="font-bold text-[#700070]">Call for Papers:</span>
          <span className="text-gray-800">
            Submit your original manuscripts for Volume 1, Issue 2 (August 2026) by 15 August 2026.
          </span>
        </div>
        <a
          href={`mailto:${companyInfo.email}`}
          className="inline-flex items-center gap-1 font-bold text-[#700070] hover:underline shrink-0 bg-white px-2.5 py-1 border border-purple-200"
        >
          <Mail className="w-3.5 h-3.5 text-[#700070]" />
          <span>{companyInfo.email}</span>
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* -------------------------------------------------------------
            LEFT COLUMN (Main Content Area — Exactly like Reference)
           ------------------------------------------------------------- */}
        <div className="lg:col-span-8 space-y-4">
          <h1 className="text-xl sm:text-2xl font-editorial font-bold text-[#111111] border-b border-gray-200 pb-2">
            Home
          </h1>

          <p className="text-xs sm:text-sm text-justify text-gray-800 leading-relaxed font-sans">
            <strong>{companyInfo.journalTitle} (ISSN: {companyInfo.issn})</strong> is an open access peer reviewed refereed journal.
          </p>

          <p className="text-xs sm:text-sm text-justify text-gray-800 leading-relaxed font-sans">
            The aim of <strong>{companyInfo.journalTitle} (ISSN: {companyInfo.issn})</strong> is to encourage scientists, academicians and students to publish their experimental and theoretical details. <strong>{companyInfo.journalTitle}</strong> provides an advanced knowledge platform for the <strong>Social Sciences, Humanities, Management, Commerce, Education &amp; Multidisciplinary Research</strong> professionals.
          </p>

          {/* Journal Particulars Table (Exact Reference Format) */}
          <SpecTable />

          {/* -------------------------------------------------------------
              ABOUT THE JOURNAL (Exact text from Manthan HTML)
             ------------------------------------------------------------- */}
          <section className="pt-2 space-y-2">
            <h2 className="text-base font-editorial font-bold text-[#700070] border-b border-gray-200 pb-1">
              About the Journal
            </h2>
            <p className="text-xs sm:text-sm text-justify text-gray-800 leading-relaxed font-sans">
              <strong>{companyInfo.journalTitle}</strong>, refereed, peer reviewed, open access journal. Researches in the field of humanities, social science, Community and Consumer Sciences, Economics, Political Science, Geography, Philosophy, History, Humanity and Languages concerning with social science, Anthropological, Behavioral Sciences, Sociology, Journalism and Role of Media in social science. Educational Sciences: For School Students, Women, Village and Society, Commerce, Law and Management related with humanities and social science, anthropology, business studies, communication studies, corporate governance, criminology, cross cultural studies, demography, development studies, economics, education, ethics, geography, history, industrial relations, information science, international relations, law, health, linguistics, library science, media studies, methodology, philosophy, political science, population Studies, psychology, public administration, sociology, social welfare, linguistics, literature, paralegal, performing arts, religious studies, visual arts, women studies, economics, international relations, development studies, population studies, political science, history, library and information science, public administration, psychology, philosophy, sociology, women studies, religious studies, social welfare, anthropology, linguistics, etc.
            </p>
          </section>

          {/* -------------------------------------------------------------
              PUBLICATION POLICY (Exact text from Manthan HTML)
             ------------------------------------------------------------- */}
          <section className="pt-3 space-y-2">
            <h2 className="text-base font-editorial font-bold text-[#700070] border-b border-gray-200 pb-1">
              Publication Policy
            </h2>

            <p className="text-xs sm:text-sm text-justify text-gray-800 leading-relaxed font-sans">
              <strong>{companyInfo.journalTitle}</strong> considers all manuscripts on the strict condition that they have not been published previously, are not under review elsewhere, and are not under consideration for publication or in press by any other journal. Manuscripts that are not sufficiently supported by appropriate research methodology, data, or academic evidence will not be considered for publication.
            </p>

            <p className="text-xs sm:text-sm text-justify text-gray-800 leading-relaxed font-sans">
              Research involving human participants, animals, or any regulated organisms must comply with applicable Institutional, National, or International ethical guidelines. Where required, authors must obtain approval from an appropriate ethics committee and include a clear statement of ethical approval and compliance within the manuscript.
            </p>

            <p className="text-xs sm:text-sm text-justify text-gray-800 leading-relaxed font-sans">
              All research submitted to <strong>{companyInfo.journalTitle}</strong> must be conducted within an appropriate ethical framework. If there is reason to believe that the research has not adhered to accepted ethical standards, the Editor-in-Chief and Editorial Board reserve the right to reject the manuscript.
            </p>

            <p className="text-xs sm:text-sm text-justify text-gray-800 leading-relaxed font-sans">
              All original research articles, review papers, case studies, short communications, and other eligible manuscript types submitted to <strong>{companyInfo.journalTitle}</strong> undergo a rigorous single-blind peer review process conducted by qualified subject experts to ensure academic quality, originality, and integrity.
            </p>

            <p className="text-xs sm:text-sm text-justify text-gray-800 leading-relaxed font-sans">
              Authors must ensure that all text, tables, figures, illustrations, and other copyrighted materials reproduced from other sources are properly acknowledged and cited. The journal follows a strict policy against plagiarism, and all submitted manuscripts may be screened using plagiarism detection software. Manuscripts found to contain plagiarism, duplicate publication, or unethical research practices will be rejected.
            </p>

            <p className="text-xs sm:text-sm text-justify text-gray-800 leading-relaxed font-sans">
              The Editorial Office reserves the right to make editorial corrections relating to grammar, formatting, style, language, and presentation while preserving the scientific content of the manuscript. The final decision regarding acceptance or rejection of any manuscript rests solely with the Editor-in-Chief, <strong>{companyInfo.editorInChief}</strong>.
            </p>

            <p className="text-xs sm:text-sm text-justify text-gray-800 leading-relaxed font-sans italic text-gray-600">
              All rights relating to the publication, distribution, and archival of accepted articles are reserved by <strong>{companyInfo.journalTitle}</strong>, subject to the journal&apos;s Open Access and Copyright Policy.
            </p>
          </section>

          {/* -------------------------------------------------------------
              CURRENT ISSUE & AUTHENTIC LATEST ARTICLES (From Manthan HTML)
             ------------------------------------------------------------- */}
          <section id="homepageIssue" className="pt-6 border-t border-gray-300 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-200 pb-1.5">
              <h2 className="text-lg sm:text-xl font-editorial font-bold text-[#700070]">
                Latest Articles: Volume 1, Issue 1 (August 2026)
              </h2>
              <span className="text-xs bg-[#700070] text-white px-2 py-0.5 font-bold">
                Current Issue
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-500 font-mono pb-2 border-b border-gray-200">
              <span className="w-2 h-2 rounded-full bg-[#700070]" />
              <Calendar className="w-3.5 h-3.5 text-[#700070]" />
              <span>Published: August 2026 • 6 Articles in Inaugural Issue</span>
            </div>

            <div className="divide-y divide-gray-200">
              {resources.map((art) => (
                <div
                  key={art.slug}
                  className="py-3 px-2 rounded hover:bg-gray-50 transition-colors first:pt-2 last:pb-0"
                >
                  <h3 className="font-editorial text-sm sm:text-base font-bold text-gray-900 hover:text-[#700070] mb-1 leading-snug">
                    <Link href={`/resources/${art.slug}`}>
                      {art.title}
                    </Link>
                  </h3>

                  <div className="text-xs text-gray-600 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-gray-400" />
                      <span className="font-semibold text-gray-800">{art.author}</span>
                      <span className="text-gray-400">•</span>
                      <span className="bg-gray-100 text-gray-700 px-1.5 py-0.2 rounded text-[11px] font-mono">{art.volume} {art.issue}</span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-[11px] text-gray-500">{art.pages}</span>
                      <Link
                        href={`/resources/${art.slug}`}
                        className="px-2 py-0.5 border border-gray-300 text-gray-700 hover:border-[#700070] hover:text-[#700070] text-[11px] font-medium transition-colors"
                      >
                        Abstract
                      </Link>
                      <Link
                        href={`/resources/${art.slug}`}
                        className="px-2 py-0.5 border border-[#700070] text-[#700070] hover:bg-[#700070] hover:text-white text-[11px] font-mono font-bold tracking-wider transition-all inline-flex items-center gap-1"
                      >
                        <FileText className="w-3 h-3 text-[#700070] group-hover:text-white" />
                        <span>PDF</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-gray-200 flex items-center justify-between">
              <Link
                href="/archives"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#700070] hover:underline uppercase tracking-wider group"
              >
                <span>Browse All Archives</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>

              <span className="text-xs text-gray-500">
                Send your article on email: <a href={`mailto:${companyInfo.email}`} className="font-mono text-[#700070] hover:underline">{companyInfo.email}</a>
              </span>
            </div>
          </section>
        </div>

        {/* -------------------------------------------------------------
            RIGHT COLUMN (Sidebar — Exactly like Reference)
           ------------------------------------------------------------- */}
        <div className="lg:col-span-4">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
