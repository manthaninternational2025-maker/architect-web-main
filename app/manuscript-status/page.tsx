import React from "react";
import { ManuscriptStatusForm } from "@/components/forms/ManuscriptStatusForm";
import { Sidebar } from "@/components/layout/Sidebar";

export const metadata = {
  title: "Manuscript Status Check | Manthan: IMJSI",
  description: "Check the review and publication status of your submitted manuscript.",
};

export default function ManuscriptStatusPage() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Content Form */}
        <div className="col-span-1 lg:col-span-8">
          <ManuscriptStatusForm />
        </div>

        {/* Sidebar */}
        <div className="col-span-1 lg:col-span-4">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}

