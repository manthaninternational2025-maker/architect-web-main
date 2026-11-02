import React from "react";
import { JournalSubmitForm } from "@/components/forms/JournalSubmitForm";
import { Sidebar } from "@/components/layout/Sidebar";

export const metadata = {
  title: "Submit Manuscript | Manthan: IMJSI",
  description: "Submit your original research article, communication, or review paper for double-blind peer review and publication.",
};

export default function SubmitPage() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Content Form */}
        <div className="col-span-1 lg:col-span-8">
          <JournalSubmitForm />
        </div>

        {/* Sidebar */}
        <div className="col-span-1 lg:col-span-4">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
