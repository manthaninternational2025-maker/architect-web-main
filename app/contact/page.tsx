"use client";

import React from "react";
import Link from "next/link";
import { companyInfo } from "@/data/companyInfo";
import { useJournalData } from "@/context/JournalDataContext";
import { ContactForm } from "@/components/forms/ContactForm";
import { Sidebar } from "@/components/layout/Sidebar";
import { Phone, MessageSquare, MapPin, FileText } from "lucide-react";

export default function ContactPage() {
  const { settings, contact } = useJournalData();

  const activeAddress =
    contact.officeAddress ||
    settings.address ||
    companyInfo.address;

  const activePhone =
    contact.helplinePhone ||
    companyInfo.phone;

  return (
    <div className="w-full">
      <div className="grid grid-cols-12 gap-2.5 sm:gap-6">
        {/* Main Content */}
        <div className="col-span-7 sm:col-span-8 space-y-4 sm:space-y-6">
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
              <div className="p-4 border border-gray-300 bg-gray-50/70 hover:border-[#700070] transition-colors">
                <div className="flex items-center gap-2 text-gray-900 font-bold font-editorial text-sm mb-1.5">
                  <div className="w-6 h-6 rounded bg-[#700070] text-white flex items-center justify-center">
                    <Phone className="w-3.5 h-3.5" />
                  </div>
                  <span>Telephone Helpline</span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed mb-2">
                  Direct voice line for academic institutions, doctoral candidates, and research supervisors.
                </p>
                <a
                  href={`tel:${activePhone.replace(/[^0-9+]/g, "")}`}
                  className="font-mono text-xs font-bold text-[#700070] hover:underline block"
                >
                  {activePhone}
                </a>
                <span className="text-[10px] text-gray-500 mt-1 block">
                  Bilingual Assistance (English / Hindi)
                </span>
              </div>

              {/* Submission Desk Card */}
              <div className="p-4 border border-gray-300 bg-gray-50/70 hover:border-[#700070] transition-colors">
                <div className="flex items-center gap-2 text-gray-900 font-bold font-editorial text-sm mb-1.5">
                  <div className="w-6 h-6 rounded bg-[#700070] text-white flex items-center justify-center">
                    <FileText className="w-3.5 h-3.5" />
                  </div>
                  <span>Online Submission</span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed mb-2">
                  Submit manuscript chapters, synopsis drafts, or datasets directly via portal.
                </p>
                <Link
                  href="/submit"
                  className="font-mono text-xs font-bold text-[#700070] hover:underline block"
                >
                  Make a Submission →
                </Link>
              </div>

              {/* Office / Correspondence */}
              <div className="p-4 border border-gray-300 bg-gray-50/70 hover:border-[#700070] transition-colors">
                <div className="flex items-center gap-2 text-gray-900 font-bold font-editorial text-sm mb-1.5">
                  <div className="w-6 h-6 rounded bg-[#700070] text-white flex items-center justify-center">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <span>Consultancy Center &amp; Office</span>
                </div>
                <p className="text-xs text-gray-800 font-medium leading-relaxed mb-2">
                  {activeAddress}
                </p>
                <span className="text-[10px] text-gray-500 block">
                  {contact.officeHours || "Monday to Saturday: 9:00 AM – 6:00 PM IST"}
                </span>
              </div>
            </div>

            {/* Embedded Contact Form */}
            <ContactForm />
          </section>
        </div>

        {/* Sidebar */}
        <div className="col-span-5 sm:col-span-4">
          <div className="sticky top-20">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
