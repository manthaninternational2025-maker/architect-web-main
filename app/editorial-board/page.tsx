"use client";

import React from "react";
import { useJournalData } from "@/context/JournalDataContext";
import { Sidebar } from "@/components/layout/Sidebar";
import { Mail, Globe, ExternalLink } from "lucide-react";

export default function EditorialBoardPage() {
  const { members, settings } = useJournalData();

  return (
    <div className="w-full">
      <div className="grid grid-cols-12 gap-2.5 sm:gap-6">
        <div className="col-span-7 sm:col-span-8 space-y-4 sm:space-y-6">
          <h1 className="text-xl sm:text-2xl font-editorial font-bold text-[#111111] border-b border-gray-200 pb-2">
            Editorial Board
          </h1>

          <div className="space-y-4">
            {members.map((member) => (
              <div key={member.id} className="text-xs bg-gray-50/50 p-4 border border-gray-200 hover:border-purple-300 transition-colors">
                <div className="flex items-start gap-4">
                  {member.photoData || member.photoUrl ? (
                    <img
                      src={member.photoData || member.photoUrl}
                      alt={member.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-purple-200 shrink-0 shadow-2xs"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-purple-100 text-[#700070] flex items-center justify-center font-bold text-sm shrink-0 border border-purple-200">
                      {member.name
                        .replace(/^Dr\.\s*|^Prof\.\s*/i, "")
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()}
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center justify-between gap-1.5">
                      <div className="font-bold text-gray-900 text-sm sm:text-base">
                        {member.name}
                      </div>

                      {/* Dual Badges: Journal Editorial Role + Academic Post */}
                      <div className="flex flex-wrap items-center gap-1.5 shrink-0">
                        {/* Editor-in-Chief / Journal Role Badge */}
                        {(member.name.toLowerCase().includes("deepak setia") ||
                          member.role.toLowerCase().includes("editor") ||
                          member.role.toLowerCase().includes("board") ||
                          member.role.toLowerCase().includes("advisor")) && (
                          <span className="text-[10px] font-bold text-white bg-[#700070] px-2 py-0.5 rounded shadow-2xs tracking-wide">
                            {member.name.toLowerCase().includes("deepak setia")
                              ? "Editor-in-Chief"
                              : member.role}
                          </span>
                        )}

                        {/* Academic Designation Badge (e.g. Assistant Professor) */}
                        <span className="text-[10px] font-semibold text-purple-900 bg-purple-100 border border-purple-200 px-2 py-0.5 rounded">
                          {member.designation ||
                            (member.role.toLowerCase().includes("assistant") ||
                            member.role.toLowerCase().includes("professor")
                              ? member.role
                              : "Assistant Professor")}
                        </span>
                      </div>
                    </div>

                    <div className="text-gray-700 font-medium mt-1">
                      {member.affiliation}
                    </div>

                    {member.specialization && (
                      <div className="text-gray-500 italic mt-0.5">
                        Specialization: {member.specialization}
                      </div>
                    )}

                    {member.bio && (
                      <p className="text-gray-600 mt-2 text-xs leading-relaxed border-t border-gray-100 pt-1.5">
                        {member.bio}
                      </p>
                    )}

                    <div className="mt-2.5 flex flex-wrap items-center gap-4 text-gray-600 font-mono text-[11px]">
                      {member.email && (
                        <div className="flex items-center gap-1">
                          <Mail className="w-3.5 h-3.5 text-[#700070]" />
                          <a href={`mailto:${member.email}`} className="text-[#700070] hover:underline">
                            {member.email}
                          </a>
                        </div>
                      )}

                      {/* Official Website / Profile Link */}
                      {member.websiteUrl && (
                        <a
                          href={member.websiteUrl.startsWith("http") ? member.websiteUrl : `https://${member.websiteUrl}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-bold text-[#700070] hover:text-[#550055] hover:underline"
                          title={`Visit official website of ${member.name}`}
                        >
                          <Globe className="w-3.5 h-3.5" />
                          <span>Visit Website ↗</span>
                        </a>
                      )}

                      {member.orcid && (
                        <a
                          href={member.orcid.startsWith("http") ? member.orcid : `https://orcid.org/${member.orcid}`}
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
            ))}
          </div>

          <div className="p-4 bg-purple-50 border border-purple-200 text-xs text-gray-700">
            <strong className="text-[#700070] block mb-1">Join the Editorial Board / Review Panel:</strong>
            Academicians, university professors, and senior researchers interested in joining the peer review panel or editorial board of <strong>{settings.journalTitle}</strong> are invited to send their curriculum vitae to <a href={`mailto:${settings.email}`} className="font-mono text-[#700070] hover:underline font-bold">{settings.email}</a>.
          </div>
        </div>

        <div className="col-span-5 sm:col-span-4">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
