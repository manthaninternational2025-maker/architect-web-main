import React from "react";
import { RequirementForm } from "@/components/forms/RequirementForm";
import { Sidebar } from "@/components/layout/Sidebar";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ShieldCheck, Lock, Clock, FileCheck } from "lucide-react";

export const metadata = {
  title: "Submit Research Requirement | Impulse Research Work",
  description: "Submit your doctoral thesis, research proposal, manuscript or dataset for confidential academic assessment and methodological review.",
};

export default function SubmitPage() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-12 gap-2.5 sm:gap-6">
        {/* Main Content Form */}
        <div className="col-span-7 sm:col-span-8 space-y-4 sm:space-y-6">
          <RequirementForm />

          {/* Privacy & Protocol Guarantee Card */}
          <div className="p-4 border border-gray-300 bg-gray-50 text-xs text-gray-700 space-y-2">
            <h4 className="font-editorial font-bold text-[#700070] text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#700070]" />
              <span>What Happens After Submission?</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 bg-white border border-gray-200">
                <span className="font-bold text-gray-900 block mb-1">1. Scope Evaluation</span>
                <span>Our disciplinary methodologists examine the complexity, timeline, and deliverables.</span>
              </div>
              <div className="p-3 bg-white border border-gray-200">
                <span className="font-bold text-gray-900 block mb-1">2. Direct Contact</span>
                <span>We connect via WhatsApp or email with an initial feasibility roadmap within 4 hours.</span>
              </div>
              <div className="p-3 bg-white border border-gray-200">
                <span className="font-bold text-gray-900 block mb-1">3. Non-Disclosure</span>
                <span>Your draft, hypothesis, and dataset remain 100% confidential under our NDA policy.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="col-span-5 sm:col-span-4">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
