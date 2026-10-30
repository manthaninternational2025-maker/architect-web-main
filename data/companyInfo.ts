export interface CompanyInfo {
  name: string;
  journalTitle: string;
  shortTitle: string;
  tagline: string;
  issn: string;
  editorInChief: string;
  publisher: string;
  frequency: string;
  email: string;
  phone: string;
  whatsapp: string;
  whatsappRaw: string;
  whatsappUrl: string;
  address: string;
  startingYear: string;
  plagiarismTool: string;
  disciplines: string[];
}

export const companyInfo: CompanyInfo = {
  name: "Impulse Publication Works",
  journalTitle: "Manthan: International Multidisciplinary Journal of Social Inquiry",
  shortTitle: "IMJSI",
  tagline: "An Open Access Peer Reviewed Refereed Journal",
  issn: "XXXX-XXXX",
  editorInChief: "Dr. Deepak Setia",
  publisher: "Impulse Publication Works",
  frequency: "Monthly",
  email: "manthaninternational2025@gmail.com",
  phone: "+91 8527231973",
  whatsapp: "+91 8527231973",
  whatsappRaw: "918527231973",
  whatsappUrl: "https://wa.me/918527231973?text=Hello%20Manthan%20Journal%2C%20I%20would%20like%20to%20submit%20my%20manuscript.",
  address: "GT Karnal Road, Dilkhush Bagh Village, Ashok Vihar, New Delhi, Delhi 110033",
  startingYear: "2026",
  plagiarismTool: "PlagiarismCheckerX / Turnitin / Drillbit",
  disciplines: [
    "Humanities & Social Sciences",
    "Economics & Development Studies",
    "Political Science & International Relations",
    "Geography & Demography",
    "Philosophy & Cultural Studies",
    "History & Archeology",
    "Commerce & Management",
    "Law & Legal Studies",
    "Sociology & Anthropology",
    "Education & Pedagogy",
    "Psychology & Behavioral Sciences",
    "Multidisciplinary Research",
  ],
};
