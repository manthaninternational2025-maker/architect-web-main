export interface CompanyInfo {
  name: string;
  tagline: string;
  subtagline: string;
  phone: string;
  whatsapp: string;
  whatsappRaw: string;
  whatsappUrl: string;
  officeHours: string;
  address: string;
  plagiarismTool: string;
  established: string;
  portalVersion: string;
  disciplines: string[];
  integrityPledge: string;
}

export const companyInfo: CompanyInfo = {
  name: "Impulse Research Work",
  tagline: "Professional Academic & Research Support",
  subtagline: "Supporting researchers from proposal to final submission.",
  phone: "+91 8527231973",
  whatsapp: "+91 8527231973",
  whatsappRaw: "918527231973",
  whatsappUrl: "https://wa.me/918527231973?text=Hello%20Impulse%20Research%20Work%2C%20I%20would%20like%20to%20discuss%20my%20academic%20research%20requirement.",
  officeHours: "Monday – Saturday: 9:00 AM – 7:30 PM IST",
  address: "Academic Research Consultancy Division, New Delhi & National Capital Region, India",
  plagiarismTool: "Turnitin / Drillbit Academic Diagnostics",
  established: "2021",
  portalVersion: "Impulse Scholar Portal v2.4",
  disciplines: [
    "Social Sciences",
    "Humanities",
    "Management",
    "Commerce",
    "Education & Pedagogy",
    "Multidisciplinary Research",
    "Psychology & Behavioral Sciences",
    "Economics & Development Studies",
    "Engineering & Applied Analytics"
  ],
  integrityPledge: "Impulse Research Work adheres strictly to international research ethics and academic integrity frameworks. We provide substantive methodological guidance, developmental editing, statistical analysis consultation, and formatting support. We do not provide contract writing or academic substitutes."
};
