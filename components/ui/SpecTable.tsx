"use client";

import React from "react";
import { useJournalData } from "@/context/JournalDataContext";

export function SpecTable() {
  const { settings } = useJournalData();

  const specs = [
    { label: "Title", value: settings.journalTitle },
    { label: "Frequency", value: settings.frequency },
    { label: "ISSN", value: settings.issn },
    { label: "Publisher", value: settings.publisher },
    { label: "Chief Editor", value: settings.editorInChief },
    { label: "Starting Year", value: settings.startingYear },
    { label: "Subject", value: settings.subject },
    { label: "Language", value: settings.language },
    { label: "Publication Format", value: settings.publicationFormat || "Online" },
    { label: "Email id", value: settings.email, isEmail: true },
    { label: "Mobile No.", value: settings.mobileNo || "+91 8527231973" },
    { label: "Website", value: settings.website, isLink: true },
    { label: "Address", value: settings.address },
    { label: "Plagiarism", value: settings.plagiarismTool },
  ];

  return (
    <div className="my-4">
      <div className="text-center mb-3">
        <h3 className="font-bold text-sm text-[#111111] underline inline-block tracking-wide">
          Journal Particulars
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border border-gray-400 border-collapse">
          <tbody>
            {specs.map((item, idx) => (
              <tr key={idx} className="border-b border-gray-300">
                <td className="py-2 px-3 font-semibold text-gray-900 w-2/5 sm:w-1/3 border-r border-gray-300 bg-white align-top">
                  {item.label}
                </td>
                <td className="py-2 px-3 text-gray-800 bg-white align-top break-words">
                  {item.isLink ? (
                    <a href={item.value.startsWith("http") ? item.value : `https://${item.value}`} target="_blank" rel="noopener noreferrer" className="text-[#700070] hover:underline font-medium break-all">
                      {item.value}
                    </a>
                  ) : item.isEmail ? (
                    <a href={`mailto:${item.value}`} className="text-[#700070] hover:underline font-mono break-all">
                      {item.value}
                    </a>
                  ) : (
                    item.value
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
