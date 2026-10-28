import React from "react";
import Link from "next/link";
import { companyInfo } from "@/data/companyInfo";
import { ContactForm } from "@/components/forms/ContactForm";
import { Sidebar } from "@/components/layout/Sidebar";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Phone, MessageSquare, Clock, MapPin, ShieldCheck, FileText } from "lucide-react";

export const metadata = {
  title: "Contact & Consultation Desk | Impulse Research Work",
  description: "Connect with Impulse Research Work. Phone & WhatsApp helpline: +91 8527231973. Direct consultations for doctoral and research candidates.",
};

export default function ContactPage() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-8 space-y-6">
          <section className="bg-white border border-gray-300 p-4 sm:p-6 shadow-xs">
            <h1 className="text-xl sm:text-2xl font-editorial font-bold text-[#111111] border-b border-gray-200 pb-2 mb-4">
              Contact Us &amp; Editorial Desk
            </h1>

            {/* Direct Contact Matrix Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {/* WhatsApp Card */}
              <div className="p-4 border border-gray-300 bg-gray-50/70 hover:border-[#700070] transition-colors">
                <div className="flex items-center gap-2 text-gray-900 font-bold font-editorial text-sm mb-1.5">
                  <div className="w-6 h-6 rounded bg-[#700070] text-white flex items-center justify-center">
                    <MessageSquare className="w-3.5 h-3.5" />
                  </div>
                  <span>WhatsApp Desk</span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed mb-2">
                  Fastest response for doctoral scoping, quote requests, and urgent submission reviews.
                </p>
                <a
                  href={companyInfo.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs font-bold text-[#700070] hover:underline block"
                >
                  {companyInfo.whatsapp}
                </a>
                <span className="text-[10px] text-gray-500 mt-1 block">
                  Active Mon–Sat, 9:00 AM – 7:30 PM IST
                </span>
              </div>

              {/* Telephone Card */}
              <div className="p-5 rounded border border-sand-200 bg-sand-50/70 hover:border-orange-500/50 transition-colors">
                <div className="flex items-center gap-2.5 text-navy-950 font-bold font-editorial text-base mb-2">
                  <div className="w-8 h-8 rounded bg-navy-950 text-white flex items-center justify-center">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span>Telephone Helpline</span>
                </div>
                <p className="text-xs text-academic-muted leading-relaxed mb-3">
                  Direct voice line for academic institutions, doctoral candidates, and research supervisors.
                </p>
                <a
                  href={`tel:${companyInfo.phone.replace(/[^0-9+]/g, "")}`}
                  className="font-mono text-sm font-bold text-navy-950 hover:text-orange-600 block"
                >
                  {companyInfo.phone}
                </a>
                <span className="text-[11px] text-academic-muted mt-1 block">
                  Bilingual Assistance (English / Hindi)
                </span>
              </div>

              {/* Submission Desk Card */}
              <div className="p-5 rounded border border-sand-200 bg-sand-50/70 hover:border-orange-500/50 transition-colors">
                <div className="flex items-center gap-2.5 text-navy-950 font-bold font-editorial text-base mb-2">
                  <div className="w-8 h-8 rounded bg-navy-950 text-white flex items-center justify-center">
                    <FileText className="w-4 h-4" />
                  </div>
                  <span>Online Submission</span>
                </div>
                <p className="text-xs text-academic-muted leading-relaxed mb-3">
                  Submit manuscript chapters, synopsis drafts, or datasets directly via portal.
                </p>
                <Link
                  href="/submit"
                  className="font-mono text-xs font-bold text-orange-600 hover:underline block"
                >
                  Make a Submission →
                </Link>
              </div>

              {/* Office / Correspondence */}
              <div className="p-5 rounded border border-sand-200 bg-sand-50/70 hover:border-orange-500/50 transition-colors">
                <div className="flex items-center gap-2.5 text-navy-950 font-bold font-editorial text-base mb-2">
                  <div className="w-8 h-8 rounded bg-navy-950 text-white flex items-center justify-center">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span>Consultancy Center</span>
                </div>
                <p className="text-xs text-academic-muted leading-relaxed mb-2">
                  {companyInfo.address}
                </p>
                <span className="text-[11px] text-academic-muted block">
                  Virtual consultations conducted globally via Zoom, Google Meet &amp; Portal Dossiers.
                </span>
              </div>
            </div>

            {/* Embedded Contact Form */}
            <ContactForm />
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
