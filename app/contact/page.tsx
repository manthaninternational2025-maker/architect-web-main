"use client";

import React from "react";
import { useJournalData } from "@/context/JournalDataContext";
import { Sidebar } from "@/components/layout/Sidebar";

export default function ContactPage() {
  const { settings } = useJournalData();

  const publisher = settings?.publisher || "Impulse Research Work";
  const website = settings?.website || "https://manthanjournal.com";
  const email = settings?.email || "manthaninternational2025@gmail.com";

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Content: Contact Us Box (Matching Reference Screenshot 2 Exactly) */}
        <div className="col-span-1 lg:col-span-8">
          <div className="border border-gray-400 bg-white p-5 sm:p-7 text-[#222222] space-y-6">
            {/* Heading */}
            <h1 className="text-xl sm:text-2xl text-[#222222] font-normal">
              Contact Us
            </h1>

            {/* Address Block */}
            <div className="text-sm sm:text-base leading-relaxed text-[#222222] space-y-0.5">
              <p className="italic font-medium">
                {publisher},
              </p>
              <p>GT Karnal Road, Dilkhush Bagh Village</p>
              <p>Ashok Vihar, New Delhi</p>
              <p>Delhi, India</p>
              <p>Pin Code: 110033</p>
            </div>

            {/* Web Address */}
            <div className="text-sm sm:text-base leading-relaxed text-[#222222]">
              <p>
                Web Address:{" "}
                <a
                  href={website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="italic hover:underline text-[#222222]"
                >
                  {website}
                </a>
              </p>
            </div>

            {/* Submission Email */}
            <div className="text-sm sm:text-base leading-relaxed text-[#222222] space-y-1">
              <p>
                For submission of your research work for publication, send your manuscript at
              </p>
              <p>
                <a
                  href={`mailto:${email}`}
                  className="font-bold italic underline text-[#700070] hover:text-[#550055]"
                >
                  {email}
                </a>
              </p>
            </div>

            {/* Query Email */}
            <div className="text-sm sm:text-base leading-relaxed text-[#222222] space-y-1">
              <p>
                For any other information or query contact at
              </p>
              <p className="italic">
                E-mail:
                <a
                  href={`mailto:${email}`}
                  className="text-[#222222] hover:text-[#700070] hover:underline"
                >
                  {email}
                </a>
              </p>
            </div>
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
