import React from "react";

export function SpecTable() {
  const specs = [
    { label: "Title:", value: "Impulse: Journal of Academic & Research Work" },
    { label: "Frequency:", value: "Quarterly" },
    { label: "ISSN:", value: "3139-695X" },
    { label: "Publisher:", value: "Impulse Research Work" },
    { label: "Starting Year:", value: "2026" },
    { label: "Subject:", value: "Social Sciences, Humanities, Management, Commerce, Education & Multidisciplinary Research" },
    { label: "Language:", value: "English, Hindi & Multilingual" },
    { label: "Publication Format:", value: "Online" },
    { label: "Website:", value: "https://impulseresearchwork.com", isLink: true },
    { label: "Address:", value: "Impulse Research Work, New Delhi, India" },
    { label: "Plagiarism Tool:", value: "Drillbit / Turnitin" },
  ];

  return (
    <div className="overflow-x-auto my-4 border border-sand-200 rounded bg-white">
      <table className="w-full text-left text-xs border-collapse">
        <tbody>
          {specs.map((item, idx) => (
            <tr
              key={idx}
              className="border-b border-sand-200 last:border-b-0 hover:bg-sand-50/60 transition-colors"
            >
              <td className="py-2 px-3 font-bold text-navy-950 w-2/5 sm:w-1/3 border-r border-sand-200">
                {item.label}
              </td>
              <td className="py-2 px-3 text-academic-text">
                {item.isLink ? (
                  <a href="/" className="text-orange-600 hover:underline">
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
  );
}
