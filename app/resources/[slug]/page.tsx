import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { resources, getResourceBySlug } from "@/data/resources";
import { companyInfo } from "@/data/companyInfo";
import { Sidebar } from "@/components/layout/Sidebar";
import {
  Calendar,
  Clock,
  BookOpen,
  Share2,
  FileText,
  Copy,
  ArrowRight,
  MessageSquare,
} from "lucide-react";

export function generateStaticParams() {
  return resources.map((resource) => ({
    slug: resource.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);
  if (!resource) return { title: "Resource Not Found" };

  return {
    title: `${resource.title} | Impulse Research Work`,
    description: resource.summary,
  };
}

export default async function ResourceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);

  if (!resource) {
    notFound();
  }

  return (
    <div className="academic-container py-8 lg:py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        {/* Main Content: Academic Article Reader */}
        <div className="lg:col-span-8 space-y-8">
          <article className="bg-white rounded border border-sand-200 p-6 sm:p-10 shadow-sm">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-[11px] font-mono text-academic-muted mb-4">
              <Link href="/" className="hover:text-orange-600">Home</Link>
              <span>/</span>
              <Link href="/resources" className="hover:text-orange-600">Resources</Link>
              <span>/</span>
              <span className="text-orange-600 font-semibold">{resource.category}</span>
            </div>

            {/* Article Header & Metadata */}
            <header className="border-b border-sand-200 pb-6 mb-8">
              <div className="flex items-center gap-2 text-xs font-mono text-academic-muted mb-3">
                <span className="px-2.5 py-0.5 rounded bg-sand-100 text-orange-600 font-semibold">
                  {resource.category}
                </span>
                <span>•</span>
                <span>IRW Guidance Series</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {resource.publishedDate}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-editorial font-bold text-navy-950 mb-4 leading-tight">
                {resource.title}
              </h1>

              <div className="flex flex-wrap items-center justify-between text-xs text-academic-muted gap-3 py-2 border-t border-b border-sand-100 font-mono">
                <div>
                  <span>Author: </span>
                  <strong className="text-navy-950">{resource.author}</strong>
                </div>
                <div className="flex items-center gap-3">
                  <span>DOI: {resource.doi}</span>
                  <span>Pages: {resource.pages}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-orange-600" />
                    {resource.readTime}
                  </span>
                </div>
              </div>
            </header>

            {/* Abstract / Summary Callout */}
            <div className="p-4 rounded bg-sand-50 border border-sand-200 mb-8">
              <h2 className="font-editorial text-sm font-bold text-navy-950 uppercase tracking-wider mb-1.5">
                Executive Abstract
              </h2>
              <p className="text-xs sm:text-sm text-academic-muted leading-relaxed italic">
                {resource.summary}
              </p>
            </div>

            {/* Article Sections Body */}
            <div className="space-y-8 text-xs sm:text-sm text-academic-text leading-relaxed">
              {resource.sections.map((section, idx) => (
                <section key={idx} className="space-y-2.5">
                  <h2 className="font-editorial text-lg sm:text-xl font-bold text-navy-950">
                    {section.heading}
                  </h2>
                  <p className="text-academic-muted leading-relaxed">
                    {section.content}
                  </p>
                </section>
              ))}
            </div>

            {/* Academic Citation Block (Standard Journal Practice) */}
            <div className="mt-10 p-5 rounded bg-sand-100/70 border border-sand-200 text-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="font-editorial font-bold text-navy-950 text-sm">
                  How to Cite This Paper (APA 7th Format)
                </span>
                <span className="font-mono text-[11px] text-academic-muted">
                  Peer-Reviewed Reference
                </span>
              </div>
              <div className="p-3 bg-white rounded border border-sand-200 font-mono text-[11px] text-navy-950 leading-relaxed select-all">
                {resource.citationText}
              </div>
            </div>

            {/* Bottom Actions: Requirement Submission & WhatsApp */}
            <div className="mt-8 pt-6 border-t border-sand-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link
                href="/submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold shadow-sm transition-colors"
              >
                <FileText className="w-4 h-4" />
                <span>Submit Your Manuscript for Review</span>
              </Link>

              <a
                href={`https://wa.me/${companyInfo.whatsappRaw}?text=${encodeURIComponent(`Hello Impulse Research Work, I read your guide on "${resource.title}" and would like to discuss my research.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded border border-navy-950 text-navy-950 hover:bg-navy-950 hover:text-white text-xs font-semibold transition-colors"
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
