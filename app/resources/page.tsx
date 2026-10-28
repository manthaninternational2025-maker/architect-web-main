import React from "react";
import Link from "next/link";
import { resources } from "@/data/resources";
import { Sidebar } from "@/components/layout/Sidebar";
import { ResourceCard } from "@/components/ui/ResourceCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { BookOpen, Calendar, Clock, FileText } from "lucide-react";

export const metadata = {
  title: "Research Resources & Guidance Archive | Impulse Research Work",
  description: "Peer-grade academic guides, referencing manuals (APA 7, IEEE, Harvard), proposal structuring blueprints, and similarity diagnostics papers.",
};

export default function ResourcesPage() {
  return (
    <div className="academic-container py-8 lg:py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        {/* Main Content */}
        <div className="lg:col-span-8 space-y-8">
          <section className="bg-white rounded border border-sand-200 p-6 sm:p-8 shadow-sm">
            <SectionHeader
              title="Research Resources &amp; Academic Archive"
              subtitle="Open academic papers, citation guidelines, and methodology guides for doctoral scholars."
              badge="Knowledge Archive"
            />

            <p className="text-xs sm:text-sm text-academic-muted leading-relaxed mb-6">
              Our academic editorial board periodically publishes actionable guidance papers addressing doctoral thesis structuring, statistical assumptions, citation standard compliance, and integrity diagnostics. All resources are peer-curated for postgraduate and faculty reference.
            </p>

            <div className="space-y-6">
              {resources.map((res) => (
                <ResourceCard key={res.slug} resource={res} />
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4">
          <div className="sticky top-20">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
