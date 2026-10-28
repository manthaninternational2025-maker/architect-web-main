import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services, getServiceBySlug } from "@/data/services";
import { companyInfo } from "@/data/companyInfo";
import { Sidebar } from "@/components/layout/Sidebar";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  FileText,
  Clock,
  Users,
  CheckCircle2,
  ArrowRight,
  MessageSquare,
  Shield,
  Send,
} from "lucide-react";

export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Service Not Found" };

  return {
    title: `${service.title} | Impulse Research Work`,
    description: service.shortDescription,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="academic-container py-8 lg:py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        {/* Main Content */}
        <div className="lg:col-span-8 space-y-8">
          <article className="bg-white rounded border border-sand-200 p-6 sm:p-8 shadow-sm">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-[11px] font-mono text-academic-muted mb-4">
              <Link href="/" className="hover:text-orange-600">Home</Link>
              <span>/</span>
              <Link href="/services" className="hover:text-orange-600">Services</Link>
              <span>/</span>
              <span className="text-orange-600 font-semibold">{service.title}</span>
            </div>

            {/* Top Meta Bar */}
            <div className="flex items-center gap-2 text-xs font-mono text-academic-muted mb-2">
              <span className="px-2 py-0.5 rounded bg-sand-100 text-orange-600 font-semibold">
                {service.category}
              </span>
              <span>•</span>
              <span>Dossier Code: {service.code}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-editorial font-bold text-navy-950 mb-4 leading-tight">
              {service.title}
            </h1>

            <p className="text-xs sm:text-sm text-academic-muted leading-relaxed mb-6 font-medium border-l-2 border-orange-500 pl-4 py-1 bg-sand-50/50">
              {service.shortDescription}
            </p>

            {/* Academic Specifications Box */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded bg-sand-50 border border-sand-200 text-xs mb-8">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-navy-950 block">Turnaround Time:</span>
                  <span className="text-academic-muted">{service.turnaround}</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Users className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-navy-950 block">Target Scholars:</span>
                  <span className="text-academic-muted">{service.targetScholars}</span>
                </div>
              </div>
            </div>

            {/* In-depth Full Description */}
            <div className="space-y-4 text-xs sm:text-sm text-academic-muted leading-relaxed mb-8">
              <h2 className="font-editorial text-lg font-bold text-navy-950 border-b border-sand-200 pb-2">
                Scope &amp; Academic Overview
              </h2>
              <p>{service.fullDescription}</p>
            </div>

            {/* Key Deliverables */}
            <div className="space-y-3 mb-8">
              <h2 className="font-editorial text-lg font-bold text-navy-950 border-b border-sand-200 pb-2">
                Core Deliverables Included
              </h2>
              <ul className="space-y-2.5">
                {service.deliverables.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-academic-text">
                    <CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Methodology & Review Protocol */}
            <div className="space-y-3 mb-8 p-4 rounded bg-sand-50 border border-sand-200">
              <h2 className="font-editorial text-base font-bold text-navy-950">
                Advisory Methodology
              </h2>
              <p className="text-xs text-academic-muted leading-relaxed">
                {service.methodology}
              </p>
            </div>

            {/* Consultation Intake Actions */}
            <div className="pt-6 border-t border-sand-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <Link
                href={`/submit?service=${encodeURIComponent(service.title)}`}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded bg-orange-500 hover:bg-orange-600 text-white text-xs sm:text-sm font-semibold transition-colors shadow-sm"
              >
                <Send className="w-4 h-4" />
                <span>Submit Manuscript for This Service</span>
              </Link>

              <a
                href={`https://wa.me/${companyInfo.whatsappRaw}?text=${encodeURIComponent(`Hello Impulse Research Work, I am inquiring about the ${service.title} service.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded border border-navy-950 text-navy-950 hover:bg-navy-950 hover:text-white text-xs sm:text-sm font-semibold transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-orange-600" />
                <span>Discuss on WhatsApp</span>
              </a>
            </div>
          </article>
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
