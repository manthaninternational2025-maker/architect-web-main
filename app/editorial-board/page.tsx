import React from "react";
import { companyInfo } from "@/data/companyInfo";
import { Sidebar } from "@/components/layout/Sidebar";
import { Mail } from "lucide-react";

export const metadata = {
  title: "Editorial Board | Manthan Journal",
  description: "Editorial Advisory Board and Reviewers of Manthan: International Multidisciplinary Journal of Social Inquiry.",
};

interface BoardMember {
  name: string;
  designation: string;
  affiliation: string;
  location: string;
  email?: string;
}

interface BoardSection {
  role: string;
  members: BoardMember[];
}

export default function EditorialBoardPage() {
  const board: BoardSection[] = [
    {
      role: "Editor-in-Chief",
      members: [
        {
          name: "Dr. Deepak Setia",
          designation: "Editor-in-Chief",
          affiliation: "Manthan: International Multidisciplinary Journal of Social Inquiry",
          location: "India",
          email: "manthaninternational2025@gmail.com"
        },
      ],
    },
    {
      role: "Associate Editors & Senior Methodologists",
      members: [
        {
          name: "Dr. S. K. Mukherjee",
          designation: "Senior Advisor (Quantitative Methods & Statistics)",
          affiliation: "Department of Management & Econometrics",
          location: "India",
        },
        {
          name: "Dr. Ananya Ray",
          designation: "Associate Editor (Social Sciences & Qualitative Inquiry)",
          affiliation: "Faculty of Humanities & Social Sciences",
          location: "India",
        },
        {
          name: "Dr. K. R. Nambiar",
          designation: "Senior Methodologist (Empirical Modeling & SEM)",
          affiliation: "Statistical Research Unit",
          location: "India",
        },
      ],
    },
    {
      role: "Editorial Review Panel",
      members: [
        {
          name: "Dr. R. Mehra",
          designation: "Reviewer (Education & Pedagogy)",
          affiliation: "Higher Education Research Forum",
          location: "India",
        },
        {
          name: "Dr. V. Singhal",
          designation: "Reviewer (Behavioral Psychology & Health)",
          affiliation: "Clinical & Social Psychology Unit",
          location: "India",
        },
        {
          name: "Dr. P. Deshmukh",
          designation: "Reviewer (Commerce & Financial Studies)",
          affiliation: "Commerce & Economic Research Council",
          location: "India",
        },
      ],
    },
  ];

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          <h1 className="text-xl sm:text-2xl font-editorial font-bold text-[#111111] border-b border-gray-200 pb-2">
            Editorial Board
          </h1>

          <div className="space-y-6">
            {board.map((section, idx) => (
              <div key={idx} className="space-y-3">
                <h2 className="text-sm font-editorial font-bold text-[#700070] border-b border-gray-200 pb-1 uppercase tracking-wide">
                  {section.role}
                </h2>
                <div className="space-y-3">
                  {section.members.map((member, mIdx) => (
                    <div key={mIdx} className="text-xs bg-gray-50/50 p-3 border border-gray-200">
                      <div className="font-bold text-gray-900 text-sm">
                        {member.name}
                      </div>
                      <div className="text-[#700070] font-semibold">{member.designation}</div>
                      <div className="text-gray-500 italic mt-0.5">
                        {member.affiliation}, {member.location}
                      </div>
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
              </div>
            ))}
          </div>

          <div className="p-4 bg-purple-50 border border-purple-200 text-xs text-gray-700">
            <strong className="text-[#700070] block mb-1">Join the Editorial Board / Review Panel:</strong>
            Academicians, university professors, and senior researchers interested in joining the peer review panel or editorial board are invited to send their curriculum vitae to <a href={`mailto:${companyInfo.email}`} className="font-mono text-[#700070] hover:underline font-bold">{companyInfo.email}</a>.
          </div>
        </div>

        <div className="lg:col-span-4">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
