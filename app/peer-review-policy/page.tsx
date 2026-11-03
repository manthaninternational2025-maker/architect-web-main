import React from "react";
import { Sidebar } from "@/components/layout/Sidebar";

export const metadata = {
  title: "Peer Review Process | Manthan: IMJSI",
  description: "Peer review process flowchart and double-blind evaluation workflow for Manthan: International Multidisciplinary Journal of Social Inquiry.",
};

export default function PeerReviewPolicyPage() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Content: Peer Review Process Box (Matching Reference Screenshot 2 Exactly) */}
        <div className="col-span-1 lg:col-span-8">
          <div className="border border-gray-400 bg-white p-5 sm:p-7 text-[#222222]">
            {/* Heading */}
            <h1 className="text-xl sm:text-2xl text-[#222222] font-normal mb-5">
              peer review process
            </h1>

            {/* Centered Flowchart Diagram */}
            <div className="flex justify-center items-center py-2 sm:py-4">
              <div className="w-full max-w-[560px] flex justify-center">
                <img
                  src="/images/peer-review-process.jpg"
                  alt="Peer Review Process Flowchart"
                  className="w-full h-auto object-contain block select-none pointer-events-none"
                />
              </div>
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
