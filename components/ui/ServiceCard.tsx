import React from "react";
import Link from "next/link";
import { Service } from "@/data/services";
import { FileText, ArrowRight, Clock, Users } from "lucide-react";

interface ServiceCardProps {
  service: Service;
  featured?: boolean;
}

export function ServiceCard({ service, featured = false }: ServiceCardProps) {
  return (
    <article className="bg-white rounded border border-sand-200 p-5 hover:border-orange-500/60 transition-all shadow-sm group flex flex-col justify-between">
      <div>
        {/* Top Meta Bar */}
        <div className="flex items-center justify-between gap-2 mb-2 text-[11px] text-academic-muted">
          <span className="font-mono text-orange-600 font-semibold uppercase tracking-wider">
            {service.category}
          </span>
          <span className="font-mono text-gray-600 font-medium">
            {service.code}
          </span>
        </div>

        {/* Title: Editorial Serif link */}
        <h3 className="font-editorial text-base sm:text-lg font-bold text-navy-950 group-hover:text-orange-600 transition-colors leading-snug mb-2">
          <Link href={`/services/${service.slug}`}>
            {service.title}
          </Link>
        </h3>

        {/* Description */}
        <p className="text-xs text-academic-muted leading-relaxed mb-4">
          {service.shortDescription}
        </p>

        {/* Academic Details Matrix */}
        <div className="space-y-1.5 py-2.5 border-t border-sand-100 text-[11px] text-academic-muted mb-4">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-orange-600 shrink-0" />
            <span>Turnaround: <strong className="text-navy-950 font-medium">{service.turnaround}</strong></span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-orange-600 shrink-0" />
            <span className="truncate">Scope: <strong className="text-navy-950 font-medium">{service.targetScholars}</strong></span>
          </div>
        </div>
      </div>

      {/* Action Row: Learn More + Galley / PDF-style badge */}
      <div className="flex items-center justify-between pt-3 border-t border-sand-200 mt-auto gap-2">
        <Link
          href={`/services/${service.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy-950 group-hover:text-orange-600 transition-colors"
        >
          <span>Learn More</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </Link>

        {/* OJS Journal Style Galley / PDF Badge */}
        <Link
          href={`/services/${service.slug}`}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded border border-navy-950 text-navy-950 hover:bg-navy-950 hover:text-white text-[11px] font-mono font-bold tracking-wider transition-colors"
          title={`View syllabus for ${service.title}`}
        >
          <FileText className="w-3 h-3 text-orange-600" />
          <span>DOSSIER</span>
        </Link>
      </div>
    </article>
  );
}
