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
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Content: Academic Article Reader */}
        <div className="lg:col-span-8 space-y-6">
          <article className="bg-white border border-gray-300 p-4 sm:p-8 shadow-xs">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-[11px] font-mono text-gray-500 mb-3">
              <Link href="/" className="hover:text-[#700070]">Home</Link>
              <span>/</span>
              <Link href="/current" className="hover:text-[#700070]">Current Issue</Link>
              <span>/</span>
              <span className="text-[#700070] font-semibold">{resource.category}</span>
            </div>

            {/* Article Header & Metadata */}
            <header className="border-b border-gray-200 pb-4 mb-6">
              <div className="flex items-center gap-2 text-xs font-mono text-gray-500 mb-2">
                <span className="px-2 py-0.5 bg-purple-50 text-[#700070] font-semibold border border-purple-200">
                  {resource.category}
                </span>
                <span>•</span>
                <span>{resource.volume} {resource.issue}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#700070]" />
                  {resource.publishedDate}
                </span>
              </div>

              <h1 className="text-xl sm:text-2xl font-editorial font-bold text-gray-900 mb-3 leading-tight">
                {resource.title}
              </h1>

              <div className="flex flex-wrap items-center justify-between text-xs text-gray-600 gap-3 py-2 border-t border-b border-gray-200 font-mono">
                <div>
                  <span>Author: </span>
                  <strong className="text-gray-900">{resource.author}</strong>
                </div>
                <div className="flex items-center gap-3">
                  <span>Pages: {resource.pages}</span>
                  <span>DOI: {resource.doi}</span>
                </div>
              </div>
            </header>

            {/* Abstract Callout */}
            <div className="p-4 bg-gray-50 border border-gray-300 mb-6">
              <h2 className="font-editorial text-xs font-bold text-[#700070] uppercase tracking-wider mb-1">
                Abstract
              </h2>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed italic">
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
