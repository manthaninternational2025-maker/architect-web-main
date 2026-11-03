"use client";

import React from "react";
import { useJournalData } from "@/context/JournalDataContext";
import { Sidebar } from "@/components/layout/Sidebar";
import { Mail, Globe } from "lucide-react";

// Robust parser to separate Department from College & University
function formatAffiliation(affiliation: string) {
  if (!affiliation) return { department: "", institution: "" };

  if (affiliation.toLowerCase().includes(" at the ")) {
    const parts = affiliation.split(/ at the /i);
    return {
      department: parts[0].trim(),
      institution: parts.slice(1).join(" at the ").trim(),
    };
  }

  const commaIdx = affiliation.indexOf(",");
  if (commaIdx > -1) {
    return {
      department: affiliation.slice(0, commaIdx).trim(),
      institution: affiliation.slice(commaIdx + 1).trim(),
    };
  }

  return { department: affiliation.trim(), institution: "" };
}

export default function EditorialBoardPage() {
  const { members, settings } = useJournalData();

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Content: Editorial Board Cards */}
        <div className="col-span-1 lg:col-span-8 space-y-6">
          <h1 className="text-xl sm:text-2xl font-editorial font-bold text-[#111111] border-b border-gray-200 pb-2">
            Editorial Board
          </h1>

          <div className="space-y-4 sm:space-y-5">
            {members.map((member) => {
              const { department, institution } = formatAffiliation(member.affiliation);

              return (
                <div
                  key={member.id}
                  className="bg-white border border-[#CCCCCC] p-5 sm:p-6 shadow-xs hover:border-[#700070] transition-colors"
                >
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
                    {/* Member Photo Avatar - Blur-free, properly aligned, no cropping */}
                    <div className="shrink-0">
                      <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-full border-2 border-purple-200 bg-white p-0.5 shadow-xs flex items-center justify-center overflow-hidden">
                        {member.photoData || member.photoUrl ? (
                          <img
                            src={member.photoData || member.photoUrl}
                            alt={member.name}
                            className="w-full h-full rounded-full object-cover block select-none"
                            style={{
                              imageRendering: "-webkit-optimize-contrast",
                            }}
                          />
                        ) : (
                          <div className="w-full h-full rounded-full bg-purple-100 text-[#700070] flex items-center justify-center font-bold text-lg sm:text-xl">
                            {member.name
                              .replace(/^Dr\.\s*|^Prof\.\s*/i, "")
                              .split(" ")
                              .map((n: string) => n[0])
                              .join("")
                              .slice(0, 2)
                              .toUpperCase()}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Member Details - Cleanly Aligned & Structured */}
                    <div className="flex-1 min-w-0 w-full text-center sm:text-left space-y-1">
                      {/* Line 1: Member Name */}
                      <h2 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight leading-snug">
                        {member.name}
                      </h2>

                      {/* Line 2: Badges (Dedicated Row for Perfect Consistency) */}
                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-0.5 pb-1.5">
                        {/* Journal Editorial Role Badge */}
                        <span className="text-[11px] font-bold text-white bg-[#700070] px-2.5 py-0.5 rounded shadow-2xs tracking-wide uppercase">
                          {member.name.toLowerCase().includes("deepak setia")
                            ? "Editor-in-Chief"
                            : member.role || "Editorial Board Member"}
                        </span>

                        {/* Academic Designation Badge */}
                        <span className="text-[11px] font-semibold text-purple-900 bg-purple-100 border border-purple-200 px-2.5 py-0.5 rounded">
                          {member.designation ||
                            (member.role.toLowerCase().includes("assistant") ||
                            member.role.toLowerCase().includes("professor")
                              ? member.role
                              : "Assistant Professor")}
                        </span>
                      </div>

                      {/* Line 3: Department */}
                      {department && (
                        <p className="text-xs sm:text-sm text-gray-800 font-medium leading-normal">
                          {department}
                        </p>
                      )}

                      {/* Line 4: College / Institution & University */}
                      {institution && (
                        <p className="text-xs sm:text-sm text-gray-800 font-medium leading-normal">
                          {institution}
                        </p>
                      )}

                      {/* Line 5: Specialization */}
                      {member.specialization && (
                        <p className="text-xs sm:text-sm text-gray-700 pt-0.5">
                          <span className="font-semibold text-gray-800">Specialization:</span>{" "}
                          <span className="italic text-gray-600">{member.specialization}</span>
                        </p>
                      )}

                      {/* Bio (if present) */}
                      {member.bio && (
                        <p className="text-xs text-gray-600 mt-2 text-left leading-relaxed bg-gray-50 p-2.5 border-l-2 border-[#700070]">
                          {member.bio}
                        </p>
                      )}

                      {/* Line 6: Contact & Official Profile Links */}
                      <div className="mt-3 pt-2.5 border-t border-gray-200 flex flex-wrap items-center justify-center sm:justify-start gap-x-5 gap-y-2 text-xs sm:text-[13px] font-mono">
                        {member.email && (
                          <div className="flex items-center gap-1.5">
                            <Mail className="w-3.5 h-3.5 text-[#700070] shrink-0" />
                            <a
                              href={`mailto:${member.email}`}
                              className="text-[#700070] hover:text-[#550055] hover:underline break-all"
                            >
                              {member.email}
                            </a>
                          </div>
                        )}

                        {member.websiteUrl && (
                          <a
                            href={
                              member.websiteUrl.startsWith("http")
                                ? member.websiteUrl
                                : `https://${member.websiteUrl}`
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 font-bold text-[#700070] hover:text-[#550055] hover:underline"
                            title={`Visit official website of ${member.name}`}
                          >
                            <Globe className="w-3.5 h-3.5 shrink-0" />
                            <span>Visit Website ↗</span>
                          </a>
                        )}

                        {member.orcid && (
                          <a
                            href={
                              member.orcid.startsWith("http")
                                ? member.orcid
                                : `https://orcid.org/${member.orcid}`
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#700070] hover:underline"
                          >
                            ORCID Profile ↗
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Join Callout Box */}
          <div className="p-4 bg-purple-50 border border-purple-200 text-xs sm:text-sm text-gray-700 leading-relaxed">
            <strong className="text-[#700070] block mb-1">
              Join the Editorial Board / Review Panel:
            </strong>
            Academicians, university professors, and senior researchers interested in joining the peer review panel or editorial board of{" "}
            <strong>{settings.journalTitle}</strong> are invited to send their curriculum vitae to{" "}
            <a
              href={`mailto:${settings.email}`}
              className="font-mono text-[#700070] hover:underline font-bold"
            >
              {settings.email}
            </a>.
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
