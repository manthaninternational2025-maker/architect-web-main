import React from "react";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  className?: string;
  id?: string;
}

export function SectionHeader({
  title,
  subtitle,
  badge,
  className = "",
  id,
}: SectionHeaderProps) {
  return (
    <div id={id} className={`mb-6 sm:mb-8 border-b border-sand-200 pb-3 ${className}`}>
      {badge && (
        <span className="inline-block text-[11px] uppercase tracking-widest font-semibold text-orange-600 mb-1">
          {badge}
        </span>
      )}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
        <h2 className="text-xl sm:text-2xl font-editorial font-bold text-navy-950 tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-xs sm:text-sm text-academic-muted max-w-xl font-normal">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
