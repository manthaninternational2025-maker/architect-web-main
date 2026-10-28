import React from "react";
import { Sidebar } from "@/components/layout/Sidebar";

export const metadata = {
  title: "Editorial Board | Impulse Research Work",
  description: "Editorial Advisory Board and Reviewers of Impulse Research Work.",
};

export default function EditorialBoardPage() {
  const board = [
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
    <div className="academic-container py-6 sm:py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-white border border-sand-200 p-6 sm:p-8 rounded shadow-xs">
          <h1 className="text-xl sm:text-2xl font-editorial font-bold text-navy-950 border-b border-sand-200 pb-2 mb-6">
            Editorial Board
          </h1>

          <div className="space-y-8">
            {board.map((section, idx) => (
              <div key={idx} className="space-y-3">
                <h2 className="text-base font-editorial font-bold text-navy-950 border-b border-sand-100 pb-1.5 uppercase tracking-wide text-xs">
                  {section.role}
                </h2>
                <div className="space-y-3">
                  {section.members.map((member, mIdx) => (
                    <div key={mIdx} className="text-xs">
                      <div className="font-bold text-navy-950 text-sm">
                        {member.name}
                      </div>
                      <div className="text-academic-muted">{member.designation}</div>
                      <div className="text-gray-500 italic">
                        {member.affiliation}, {member.location}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
