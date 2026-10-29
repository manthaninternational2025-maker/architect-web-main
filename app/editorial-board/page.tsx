"use client";

import React from "react";
import { useJournalData } from "@/context/JournalDataContext";
import { Sidebar } from "@/components/layout/Sidebar";
import { Mail } from "lucide-react";

export default function EditorialBoardPage() {
  const { members, settings } = useJournalData();

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          <h1 className="text-xl sm:text-2xl font-editorial font-bold text-[#111111] border-b border-gray-200 pb-2">
            Editorial Board
          </h1>

          <div className="space-y-4">
            {members.map((member) => (
              <div key={member.id} className="text-xs bg-gray-50/50 p-3.5 border border-gray-200 hover:border-purple-200 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-gray-900 text-sm sm:text-base">
                    {member.name}
                  </div>
                  <span className="text-[10px] font-bold text-purple-900 bg-purple-100 px-2 py-0.5 rounded">
                    {member.role}
                  </span>
                </div>
                <div className="text-gray-700 font-medium mt-1">
                  {member.affiliation}
                </div>
                {member.specialization && (
                  <div className="text-gray-500 italic mt-0.5">
                    Specialization: {member.specialization}
                  </div>
                )}
                {member.email && (
                  <div className="mt-1.5 flex items-center gap-1 text-gray-600 font-mono text-[11px]">
                    <Mail className="w-3.5 h-3.5 text-[#700070]" />
                    <a href={`mailto:${member.email}`} className="text-[#700070] hover:underline">
                      {member.email}
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="p-4 bg-purple-50 border border-purple-200 text-xs text-gray-700">
            <strong className="text-[#700070] block mb-1">Join the Editorial Board / Review Panel:</strong>
            Academicians, university professors, and senior researchers interested in joining the peer review panel or editorial board of <strong>{settings.journalTitle}</strong> are invited to send their curriculum vitae to <a href={`mailto:${settings.email}`} className="font-mono text-[#700070] hover:underline font-bold">{settings.email}</a>.
          </div>
        </div>

        <div className="lg:col-span-4">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
