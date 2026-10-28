import React from "react";
import Link from "next/link";
import { services } from "@/data/services";
import { Sidebar } from "@/components/layout/Sidebar";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Layers } from "lucide-react";

export const metadata = {
  title: "Academic Research Support Services | Impulse Research Work",
  description: "Explore our 10 specialized academic support services: Thesis Review, Research Proposal, Data Analysis, Academic Editing, Referencing, Similarity Review, and Viva Defense.",
};

export default function ServicesPage() {
  return (
    <div className="academic-container py-8 lg:py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        {/* Main Content */}
        <div className="lg:col-span-8 space-y-8">
          <section className="bg-white rounded border border-sand-200 p-6 sm:p-8 shadow-sm">
            <SectionHeader
              title="Research Support Services Directory"
              subtitle="Specialized methodological portfolios structured across the research and doctoral lifecycle."
              badge="Services Index"
            />

            <p className="text-xs sm:text-sm text-academic-muted leading-relaxed mb-8">
              Every research project presents distinct methodological, statistical, and editorial demands. Select an academic service below to explore detailed deliverables, advisory methodology, estimated turnaround, and submission guidelines.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {services.map((service) => (
                <ServiceCard key={service.slug} service={service} />
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
