import React from "react";
import Link from "next/link";
import { Resource } from "@/data/resources";
import { BookOpen, Calendar, Clock, ArrowRight } from "lucide-react";

interface ResourceCardProps {
  resource: Resource;
}

export function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <article className="bg-white rounded border border-sand-200 p-5 hover:border-orange-500/60 transition-all shadow-sm group flex flex-col justify-between">
      <div>
        {/* Category & Date */}
        <div className="flex items-center justify-between text-[11px] text-academic-muted mb-2">
          <span className="font-mono text-orange-600 font-semibold uppercase tracking-wider">
            {resource.category}
          </span>
          <div className="flex items-center gap-1 font-mono">
            <Calendar className="w-3 h-3" />
            <span>{resource.publishedDate}</span>
          </div>
        </div>

        {/* Title: Serif editorial link */}
        <h3 className="font-editorial text-base sm:text-lg font-bold text-navy-950 group-hover:text-orange-600 transition-colors leading-snug mb-2">
          <Link href={`/resources/${resource.slug}`}>
            {resource.title}
          </Link>
        </h3>

        {/* Summary */}
        <p className="text-xs text-academic-muted leading-relaxed mb-4">
          {resource.summary}
        </p>

        {/* Citation & Read Time Bar */}
        <div className="pt-2.5 border-t border-sand-100 flex items-center justify-between text-[11px] text-academic-muted mb-4">
          <span className="font-mono text-[10px] truncate max-w-[200px]">
            DOI: {resource.doi}
          </span>
          <span className="flex items-center gap-1 text-[11px]">
            <Clock className="w-3 h-3 text-orange-600" />
            {resource.readTime}
          </span>
        </div>
      </div>

      {/* Action Row */}
      <div className="pt-3 border-t border-sand-200 flex items-center justify-between mt-auto">
        <Link
          href={`/resources/${resource.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy-950 group-hover:text-orange-600 transition-colors"
        >
          <span>Read Full Guide</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </Link>

        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-sand-100 text-academic-muted border border-sand-200">
          pp. {resource.pages}
        </span>
      </div>
    </article>
  );
}
