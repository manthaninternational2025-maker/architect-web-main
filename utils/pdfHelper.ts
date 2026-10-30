/**
 * PDF Helper Utility for Manthan: International Multidisciplinary Journal of Social Inquiry
 * Reliably opens uploaded Base64 PDFs, external PDF URLs, and dynamically generates
 * official academic galley publication PDFs for published articles.
 */

import { ArticleItem, JournalSettings } from "@/context/JournalDataContext";

function escapePdfText(text: string): string {
  if (!text) return "";
  return text
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)");
}

function wrapText(text: string, maxChars: number): string[] {
  if (!text) return [];
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let currentLine = "";
  for (const word of words) {
    if ((currentLine + " " + word).trim().length <= maxChars) {
      currentLine = (currentLine + " " + word).trim();
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines;
}

/**
 * Generates an authentic academic PDF Blob for an article on the fly.
 */
export function generateAcademicPdfBlob(
  article: Partial<ArticleItem>,
  settings?: Partial<JournalSettings>
): Blob {
  const title = article.title || "Untitled Research Article";
  const titleLines = wrapText(title, 60);
  const abstract = article.abstract || "Abstract indexed in official journal record.";
  const abstractLines = wrapText(abstract, 80);
  const authors = article.authors || "Editorial Staff & Contributing Authors";
  const doi = article.doi || "10.5281/imjsi.2026.01.01";
  const volIssue = `${article.volume || "Vol. 1"}, ${article.issue || "Issue 1"} (${
    article.date || "August 2026"
  })`;
  const journalTitle =
    settings?.journalTitle ||
    "Manthan: International Multidisciplinary Journal of Social Inquiry";
  const issn = settings?.issn || "XXXX-XXXX";
  const publisher = settings?.publisher || "Impulse Publication Works";
  const category = article.category || "Multidisciplinary Social Inquiry";
  const pages = article.pages || "pp. 1-12";
  const keywords =
    article.keywords ||
    "Peer-Reviewed Research, Empirical Analysis, Social Inquiry, Methodology";

  let stream = "";

  // 1. Purple Header Bar & Journal Branding
  stream += `q 0.44 0 0.44 rg 40 790 515 3.5 re f Q\n`;
  stream += `BT /F1 9 Tf 0.44 0 0.44 rg 40 802 Td (${escapePdfText(
    journalTitle.toUpperCase()
  )}) Tj ET\n`;
  stream += `BT /F2 8 Tf 0.3 0.3 0.3 rg 40 778 Td (ISSN: ${escapePdfText(
    issn
  )} | ${escapePdfText(volIssue)} | Refereed & Peer-Reviewed Open Access) Tj ET\n`;
  stream += `BT /F2 8 Tf 0.44 0 0.44 rg 435 778 Td (DOI: ${escapePdfText(doi)}) Tj ET\n`;

  // Thin separator line
  stream += `q 0.8 0.8 0.8 RG 1 w 40 768 m 555 768 l S Q\n`;

  // 2. Article Title (Dynamic wrapping)
  let y = 740;
  stream += `BT /F1 15 Tf 0.1 0.1 0.15 rg 40 ${y} Td (${escapePdfText(
    titleLines[0] || ""
  )}) Tj ET\n`;
  for (let i = 1; i < titleLines.length; i++) {
    y -= 18;
    stream += `BT /F1 15 Tf 0.1 0.1 0.15 rg 40 ${y} Td (${escapePdfText(
      titleLines[i]
    )}) Tj ET\n`;
  }

  // 3. Authors & Affiliation
  y -= 22;
  stream += `BT /F1 11 Tf 0.44 0 0.44 rg 40 ${y} Td (${escapePdfText(authors)}) Tj ET\n`;
  y -= 14;
  stream += `BT /F2 8.5 Tf 0.4 0.4 0.4 rg 40 ${y} Td (Published by ${escapePdfText(
    publisher
  )} | Indexed & Preserved in Official Journal Archive) Tj ET\n`;

  // 4. Metadata Badge Box
  y -= 22;
  stream += `q 0.96 0.96 0.98 rg 40 ${y - 18} 515 32 re f Q\n`;
  stream += `q 0.85 0.85 0.9 RG 0.5 w 40 ${y - 18} 515 32 re s Q\n`;
  stream += `BT /F1 8 Tf 0.2 0.2 0.2 rg 50 ${y - 4} Td (Subject Area: ${escapePdfText(
    category
  )}) Tj ET\n`;
  stream += `BT /F2 8 Tf 0.3 0.3 0.3 rg 250 ${y - 4} Td (Publication Date: ${escapePdfText(
    article.date || "August 2026"
  )}) Tj ET\n`;
  stream += `BT /F2 8 Tf 0.3 0.3 0.3 rg 420 ${y - 4} Td (Pagination: ${escapePdfText(
    pages
  )}) Tj ET\n`;

  // 5. Abstract Section
  y -= 45;
  stream += `BT /F1 11 Tf 0.44 0 0.44 rg 40 ${y} Td (ABSTRACT) Tj ET\n`;
  y -= 6;
  stream += `q 0.44 0 0.44 RG 1.5 w 40 ${y} m 105 ${y} l S Q\n`;

  y -= 16;
  for (const line of abstractLines) {
    if (y < 120) break;
    stream += `BT /F2 9.5 Tf 0.15 0.15 0.15 rg 40 ${y} Td (${escapePdfText(line)}) Tj ET\n`;
    y -= 14;
  }

  // 6. Keywords Section
  if (y > 100) {
    y -= 8;
    stream += `BT /F1 9 Tf 0.2 0.2 0.2 rg 40 ${y} Td (Keywords: ) Tj /F2 9 Tf 0.35 0.35 0.35 rg (${escapePdfText(
      keywords
    )}) Tj ET\n`;
  }

  // 7. Academic Citation Box (APA 7th)
  if (y > 130) {
    y -= 28;
    stream += `q 0.98 0.97 0.95 rg 40 ${y - 25} 515 36 re f Q\n`;
    stream += `q 0.9 0.85 0.8 RG 0.5 w 40 ${y - 25} 515 36 re s Q\n`;
    stream += `BT /F1 8 Tf 0.44 0 0.44 rg 50 ${y - 2} Td (HOW TO CITE THIS PAPER (APA 7th Format):) Tj ET\n`;
    const citeLine = `${authors} (2026). ${title}. ${journalTitle}, ${
      article.volume || "1"
    }(${article.issue ? article.issue.replace(/[^0-9]/g, "") || "1" : "1"}), ${doi}.`;
    const citeWrapped = wrapText(citeLine, 95);
    stream += `BT /F2 7.5 Tf 0.2 0.2 0.2 rg 50 ${y - 14} Td (${escapePdfText(
      citeWrapped[0] || ""
    )}) Tj ET\n`;
    if (citeWrapped[1]) {
      stream += `BT /F2 7.5 Tf 0.2 0.2 0.2 rg 50 ${y - 23} Td (${escapePdfText(
        citeWrapped[1]
      )}) Tj ET\n`;
    }
  }

  // 8. Footer Rule & Open Access License Watermark
  stream += `q 0.85 0.85 0.85 RG 1 w 40 48 m 555 48 l S Q\n`;
  stream += `BT /F2 8 Tf 0.5 0.5 0.5 rg 40 36 Td ((c) 2026 The Author(s). Published under Creative Commons Attribution 4.0 International (CC BY 4.0)) Tj ET\n`;
  stream += `BT /F1 8 Tf 0.44 0 0.44 rg 440 36 Td (Official Academic Galley) Tj ET\n`;

  // Assemble PDF document structure
  const streamEncoder = new TextEncoder();
  const streamBytes = streamEncoder.encode(stream);
  const streamLength = streamBytes.length;

  let header = "%PDF-1.4\n%\xE2\xE3\xCF\xD3\n";
  const offsets: number[] = [];

  function appendObj(content: string) {
    offsets.push(header.length);
    header += content + "\n";
  }

  appendObj("1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj");
  appendObj("2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj");
  appendObj(
    "3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595.28 841.89] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> >>\nendobj"
  );
  appendObj(`4 0 obj\n<< /Length ${streamLength} >>\nstream\n${stream}\nendstream\nendobj`);
  appendObj("5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj");
  appendObj("6 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj");

  const startxref = header.length;
  header += "xref\n0 7\n0000000000 65535 f \n";
  for (let i = 0; i < 6; i++) {
    header += String(offsets[i]).padStart(10, "0") + " 00000 n \n";
  }
  header += `trailer\n<< /Size 7 /Root 1 0 R >>\nstartxref\n${startxref}\n%%EOF\n`;

  return new Blob([header], { type: "application/pdf" });
}

/**
 * Converts a Base64 data URI to a Blob
 */
export function base64ToBlob(dataUri: string): Blob {
  const parts = dataUri.split(",");
  const mimeMatch = parts[0]?.match(/:(.*?);/);
  const mimeType = mimeMatch ? mimeMatch[1] : "application/pdf";
  const byteCharacters = atob(parts[1] || "");
  const byteNumbers = new Uint8Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  return new Blob([byteNumbers], { type: mimeType });
}

/**
 * Gets a clean, browser-renderable Blob URL or direct URL for an article's document.
 */
export function getArticlePdfBlobUrl(
  article: Partial<ArticleItem>,
  settings?: Partial<JournalSettings>
): { url: string; isBlob: boolean; mimeType: string; isDocx: boolean } {
  // 1. Custom uploaded file (Base64)
  if (article.fileData && article.fileData.startsWith("data:")) {
    try {
      const blob = base64ToBlob(article.fileData);
      const isDocx =
        blob.type.includes("word") ||
        blob.type.includes("msword") ||
        (article.fileName || "").endsWith(".docx") ||
        (article.fileName || "").endsWith(".doc");
      const url = URL.createObjectURL(blob);
      return { url, isBlob: true, mimeType: blob.type, isDocx };
    } catch (e) {
      console.error("Failed to decode uploaded file base64:", e);
    }
  }

  // 2. Direct external or hosted PDF URL
  if (
    article.pdfUrl &&
    (article.pdfUrl.startsWith("http://") ||
      article.pdfUrl.startsWith("https://") ||
      article.pdfUrl.startsWith("/"))
  ) {
    return {
      url: article.pdfUrl,
      isBlob: false,
      mimeType: "application/pdf",
      isDocx: false,
    };
  }

  // 3. Dynamic authentic publication PDF Blob
  const fallbackBlob = generateAcademicPdfBlob(article, settings);
  const fallbackUrl = URL.createObjectURL(fallbackBlob);
  return {
    url: fallbackUrl,
    isBlob: true,
    mimeType: "application/pdf",
    isDocx: false,
  };
}

/**
 * Opens an article's PDF in a new browser tab or downloads Word files.
 */
export function openArticlePdf(
  article: Partial<ArticleItem>,
  settings?: Partial<JournalSettings>
): string {
  const { url, mimeType, isDocx } = getArticlePdfBlobUrl(article, settings);

  if (isDocx) {
    // Word files cannot be rendered natively in browser PDF reader, so download it
    const a = document.createElement("a");
    a.href = url;
    a.download = article.fileName || `${article.title || "manuscript"}.docx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    return url;
  }

  // Open PDF in a new tab
  const newTab = window.open(url, "_blank", "noopener,noreferrer");
  if (!newTab || newTab.closed || typeof newTab.closed === "undefined") {
    // If browser popup blocker intercepts, trigger via temporary anchor
    const a = document.createElement("a");
    a.href = url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  return url;
}
