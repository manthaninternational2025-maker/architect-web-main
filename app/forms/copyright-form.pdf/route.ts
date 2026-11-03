import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const filePath = path.join(process.cwd(), "public", "forms", "copyright-form.pdf");

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "Form not found" }, { status: 404 });
  }

  const fileBuffer = fs.readFileSync(filePath);

  return new NextResponse(fileBuffer, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'inline; filename="Manthan-Copyright-Form.pdf"',
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}

