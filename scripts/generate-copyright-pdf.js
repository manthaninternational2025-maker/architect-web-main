const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const fs = require('fs');
const path = require('path');

async function createCopyrightPdf() {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595.28, 841.89]); // A4
  const { width, height } = page.getSize();

  const fontTimesRoman = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const fontTimesBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
  const fontTimesItalic = await pdfDoc.embedFont(StandardFonts.TimesRomanItalic);
  const fontTimesBoldItalic = await pdfDoc.embedFont(StandardFonts.TimesRomanBoldItalic);

  const purple = rgb(0.44, 0.0, 0.44);     // #700070
  const darkRed = rgb(0.58, 0.0, 0.0);    // #940000
  const blue = rgb(0.0, 0.27, 0.8);       // #0044CC
  const black = rgb(0.1, 0.1, 0.1);
  const grayLine = rgb(0.45, 0.45, 0.45);

  const leftMargin = 50;
  const rightMargin = 545;
  const contentWidth = rightMargin - leftMargin;

  let y = height - 42;

  // --- EMBED OR DRAW CIRCULAR LOGO ---
  let logoDrawn = false;
  try {
    const logoPath = path.join(process.cwd(), 'public', 'images', 'impulse-logo.png');
    if (fs.existsSync(logoPath)) {
      const logoBytes = fs.readFileSync(logoPath);
      const logoImage = await pdfDoc.embedPng(logoBytes);
      const logoSize = 64;
      page.drawImage(logoImage, {
        x: leftMargin + 4,
        y: y - 56,
        width: logoSize,
        height: logoSize,
      });
      logoDrawn = true;
    }
  } catch (err) {
    console.warn("Could not embed png logo:", err);
  }

  // --- HEADER TEXT (CENTERED OVER MAIN COLUMN) ---
  const headerCenterX = leftMargin + 64 + (contentWidth - 64) / 2;

  // 1. Journal Title (2 lines)
  const line1 = "Manthan: International Multidisciplinary Journal of";
  const line2 = "Social Inquiry";
  const sizeTitle = 14.5;
  const w1 = fontTimesBoldItalic.widthOfTextAtSize(line1, sizeTitle);
  page.drawText(line1, {
    x: headerCenterX - w1 / 2,
    y: y - 10,
    size: sizeTitle,
    font: fontTimesBoldItalic,
    color: purple,
  });

  const w2 = fontTimesBoldItalic.widthOfTextAtSize(line2, sizeTitle);
  page.drawText(line2, {
    x: headerCenterX - w2 / 2,
    y: y - 27,
    size: sizeTitle,
    font: fontTimesBoldItalic,
    color: purple,
  });

  // 2. ISSN
  const issnText = "(ISSN: Under Process (Online))";
  const sizeIssn = 12;
  const wIssn = fontTimesBold.widthOfTextAtSize(issnText, sizeIssn);
  page.drawText(issnText, {
    x: headerCenterX - wIssn / 2,
    y: y - 44,
    size: sizeIssn,
    font: fontTimesBold,
    color: purple,
  });

  // 3. Website Link
  const webText = "https://manthanjournal.com/";
  const sizeWeb = 10;
  const wWeb = fontTimesBold.widthOfTextAtSize(webText, sizeWeb);
  const webX = headerCenterX - wWeb / 2;
  const webY = y - 59;
  page.drawText(webText, {
    x: webX,
    y: webY,
    size: sizeWeb,
    font: fontTimesBold,
    color: blue,
  });
  page.drawLine({
    start: { x: webX, y: webY - 1 },
    end: { x: webX + wWeb, y: webY - 1 },
    thickness: 0.75,
    color: blue,
  });

  y -= 88;

  // --- COPYRIGHT / UNDERTAKING FORM HEADING ---
  const headingText = "COPYRIGHT/ UNDERTAKING FORM";
  const sizeHeading = 12.5;
  const wHeading = fontTimesBold.widthOfTextAtSize(headingText, sizeHeading);
  const hX = (width - wHeading) / 2;
  page.drawText(headingText, {
    x: hX,
    y: y,
    size: sizeHeading,
    font: fontTimesBold,
    color: darkRed,
  });
  page.drawLine({
    start: { x: hX, y: y - 2 },
    end: { x: hX + wHeading, y: y - 2 },
    thickness: 1,
    color: darkRed,
  });

  y -= 26;

  // --- FORM FIELDS ---
  // Field 1: Manuscript I.D.
  const f1Label = "Manuscript I.D. ";
  const f1Suffix = " (Leave Blank if not assigned)";
  const wF1Label = fontTimesBold.widthOfTextAtSize(f1Label, 10);
  const wF1Suffix = fontTimesBold.widthOfTextAtSize(f1Suffix, 9.5);
  page.drawText(f1Label, { x: leftMargin, y, size: 10, font: fontTimesBold, color: black });
  
  const line1StartX = leftMargin + wF1Label;
  const line1EndX = rightMargin - wF1Suffix;
  page.drawLine({
    start: { x: line1StartX, y: y - 1 },
    end: { x: line1EndX, y: y - 1 },
    thickness: 0.7,
    color: grayLine,
  });
  page.drawText(f1Suffix, { x: line1EndX, y, size: 9.5, font: fontTimesBold, color: black });

  // Field 2: Name of Corresponding Author
  y -= 19;
  const f2Label = "Name of Corresponding Author: ";
  const wF2Label = fontTimesBold.widthOfTextAtSize(f2Label, 10);
  page.drawText(f2Label, { x: leftMargin, y, size: 10, font: fontTimesBold, color: black });
  page.drawLine({
    start: { x: leftMargin + wF2Label, y: y - 1 },
    end: { x: rightMargin, y: y - 1 },
    thickness: 0.7,
    color: grayLine,
  });

  // Field 3: Name/s of Co-Author/s
  y -= 19;
  const f3Label = "Name/s of Co-Author/s: ";
  const wF3Label = fontTimesBold.widthOfTextAtSize(f3Label, 10);
  page.drawText(f3Label, { x: leftMargin, y, size: 10, font: fontTimesBold, color: black });
  page.drawLine({
    start: { x: leftMargin + wF3Label, y: y - 1 },
    end: { x: rightMargin, y: y - 1 },
    thickness: 0.7,
    color: grayLine,
  });

  // Field 4: Title of manuscript (2 lines)
  y -= 19;
  const f4Label = "Title of manuscript: ";
  const wF4Label = fontTimesBold.widthOfTextAtSize(f4Label, 10);
  page.drawText(f4Label, { x: leftMargin, y, size: 10, font: fontTimesBold, color: black });
  page.drawLine({
    start: { x: leftMargin + wF4Label, y: y - 1 },
    end: { x: rightMargin, y: y - 1 },
    thickness: 0.7,
    color: grayLine,
  });

  y -= 17;
  page.drawLine({
    start: { x: leftMargin, y: y - 1 },
    end: { x: rightMargin, y: y - 1 },
    thickness: 0.7,
    color: grayLine,
  });

  // --- SEPARATOR RULE ---
  y -= 16;
  page.drawLine({
    start: { x: leftMargin, y },
    end: { x: rightMargin, y },
    thickness: 1.2,
    color: rgb(0.2, 0.2, 0.2),
  });

  y -= 14;

  // --- HELPER TO DRAW WRAPPED & JUSTIFIED PARAGRAPHS ---
  function drawParagraph(text, font, size, lineGap = 3.5, isBold = false) {
    const words = text.split(/\s+/);
    let lineWords = [];

    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      const testLine = [...lineWords, word].join(' ');
      const testWidth = font.widthOfTextAtSize(testLine, size);

      if (testWidth <= contentWidth) {
        lineWords.push(word);
      } else {
        // Justify this line across contentWidth
        if (lineWords.length > 1) {
          const joined = lineWords.join(' ');
          const naturalWidth = font.widthOfTextAtSize(joined, size);
          const totalSpaceToAdd = contentWidth - naturalWidth;
          const extraSpacePerGap = totalSpaceToAdd / (lineWords.length - 1);

          let curX = leftMargin;
          for (let w = 0; w < lineWords.length; w++) {
            page.drawText(lineWords[w], {
              x: curX,
              y,
              size,
              font,
              color: black,
            });
            const wordWidth = font.widthOfTextAtSize(lineWords[w], size);
            const spaceWidth = font.widthOfTextAtSize(' ', size);
            curX += wordWidth + spaceWidth + extraSpacePerGap;
          }
        } else {
          page.drawText(lineWords[0], { x: leftMargin, y, size, font, color: black });
        }

        y -= (size + lineGap);
        lineWords = [word];
      }
    }

    // Last line (left-aligned)
    if (lineWords.length > 0) {
      page.drawText(lineWords.join(' '), { x: leftMargin, y, size, font, color: black });
      y -= (size + lineGap);
    }
  }

  const pSize = 8.5;
  const pLineGap = 3.2;

  // Paragraph 1
  drawParagraph(
    "The author(s) acknowledged that the manuscript submitted is his/her/their own original work; all authors participated in the work in a substantive way and are prepared to take public responsibility for the work; all authors have seen and approved the manuscript as submitted; the manuscript has not been published and is not being submitted or considered for publication elsewhere; the text, illustrations, and any other materials included in the manuscript do not infringe (plagiarism) upon any existing copyright or other rights of anyone.",
    fontTimesRoman,
    pSize,
    pLineGap
  );

  y -= 4;

  // Paragraph 2
  drawParagraph(
    "Notwithstanding the above, the Contributor(s) or, if applicable the Contributor's Employer, retain(s) all proprietary rights other than copyright, such as Patent rights; to use, free of charge, all parts of this article for the author's future works in books, lectures, classroom teaching or oral presentations; the right to reproduce the article for their own purposes provided the copies are not offered for sale.",
    fontTimesRoman,
    pSize,
    pLineGap
  );

  y -= 4;

  // Paragraph 3 (Italicized)
  drawParagraph(
    "I/We further declare that the manuscript has been checked for plagiarism and the overall similarity index is below 10%, in accordance with the journal's ethical guidelines.",
    fontTimesItalic,
    pSize,
    pLineGap
  );

  y -= 4;

  // Paragraph 4 (Italicized)
  drawParagraph(
    "I/We also affirm that the use of Artificial Intelligence–based tools, if any, was limited to language refinement only and does not exceed 10%, and no AI tool was used to generate core research content, data, analysis, or conclusions.",
    fontTimesItalic,
    pSize,
    pLineGap
  );

  y -= 4;

  // Paragraph 5 (Indemnification)
  drawParagraph(
    "I/We indemnify Manthan: International Multidisciplinary Journal of Social Inquiry (ISSN: Under Process (Online)) and the Editors, and hold them harmless from any loss, expense or damage occasioned by a claim or suit by a third party for copyright infringement, or any suit arising out of any breach of the foregoing warranties as a result of publication of my/our article. I/We also warrant that the article contains no libelous or unlawful statements and does not contain material or instructions that might cause harm or injury.",
    fontTimesItalic,
    pSize,
    pLineGap
  );

  y -= 26;

  // --- SIGNATURE AND DATE BLOCK ---
  // Left: Date & Place
  page.drawText("Date: ", { x: leftMargin, y, size: 10, font: fontTimesBold, color: black });
  page.drawLine({
    start: { x: leftMargin + 32, y: y - 1 },
    end: { x: leftMargin + 175, y: y - 1 },
    thickness: 0.7,
    color: grayLine,
  });

  // Right: Signature
  const sigText = "Signature";
  const wSig = fontTimesBold.widthOfTextAtSize(sigText, 10);
  const sigX = rightMargin - 130;
  page.drawText(sigText, {
    x: sigX + (130 - wSig) / 2,
    y,
    size: 10,
    font: fontTimesBold,
    color: black,
  });

  y -= 20;

  page.drawText("Place: ", { x: leftMargin, y, size: 10, font: fontTimesBold, color: black });
  page.drawLine({
    start: { x: leftMargin + 32, y: y - 1 },
    end: { x: leftMargin + 175, y: y - 1 },
    thickness: 0.7,
    color: grayLine,
  });

  // Right: (Corresponding Author)
  const authorText = "(Corresponding Author)";
  const wAuthor = fontTimesBold.widthOfTextAtSize(authorText, 10);
  page.drawText(authorText, {
    x: sigX + (130 - wAuthor) / 2,
    y,
    size: 10,
    font: fontTimesBold,
    color: black,
  });

  y -= 26;

  // --- BOTTOM NOTE ---
  const noteBold = "Note: Your article will not be published unless the duly signed Copyright form has been received.";
  page.drawText(noteBold, {
    x: leftMargin,
    y,
    size: 9.5,
    font: fontTimesBold,
    color: black,
  });

  // --- SAVE PDF ---
  const pdfBytes = await pdfDoc.save();
  const outDir = path.join(process.cwd(), 'public', 'forms');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }
  const outPath = path.join(outDir, 'copyright-form.pdf');
  fs.writeFileSync(outPath, pdfBytes);
  console.log('Copyright form PDF successfully created at:', outPath);
  console.log('Size:', pdfBytes.length, 'bytes');
}

createCopyrightPdf().catch(console.error);

