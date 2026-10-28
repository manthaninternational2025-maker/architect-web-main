import React from "react";

export function SpecTable() {
  const specs = [
    { label: "Title", value: "Journal of Academic & Multidisciplinary Research" },
    { label: "Frequency", value: "Quarterly" },
    { label: "ISSN:", value: "3139-695X (Online)" },
    { label: "Publisher:", value: "Impulse Research Work" },
    { label: "Starting Year:", value: "2025" },
    { label: "Subject:", value: "Social Sciences, Humanities, Management, Commerce, Education & Multidisciplinary Research" },
    { label: "Language:", value: "Multiple Language (English, Hindi & Multilingual)" },
    { label: "Publication Format:", value: "Online" },
    { label: "Website:", value: "https://impulseresearchwork.com", isLink: true },
    { label: "Address:", value: "Impulse Research Work, New Delhi, India" },
    { label: "Plagiarism", value: "PlagiarismCheckerX / Turnitin / Drillbit" },
  ];

  return (
    <div className="my-4">
      <div className="text-center mb-3">
        <h3 className="font-bold text-sm text-[#111111] underline inline-block">
          Journal Particulars
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border border-gray-400 border-collapse">
          <tbody>
            {specs.map((item, idx) => (
              <tr key={idx} className="border-b border-gray-300">
                <td className="py-2 px-3 font-semibold text-gray-900 w-2/5 sm:w-1/3 border-r border-gray-300 bg-white">
                  {item.label}
                </td>
                <td className="py-2 px-3 text-gray-800 bg-white">
                  {item.isLink ? (
                    <a href={item.value} className="text-[#700070] hover:underline">
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
