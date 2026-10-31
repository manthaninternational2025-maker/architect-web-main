import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ success: false, error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const publicImagesDir = path.join(process.cwd(), "public", "images");
    if (!fs.existsSync(publicImagesDir)) {
      fs.mkdirSync(publicImagesDir, { recursive: true });
    }

    const timestamp = Date.now();
    // 1. Save as the main cover image
    const mainCoverPath = path.join(publicImagesDir, "manthan-cover-page.png");
    await fs.promises.writeFile(mainCoverPath, buffer);

    // 2. Also save with timestamp to guarantee cache-busting
    const timestampedPath = path.join(publicImagesDir, `cover-${timestamp}.png`);
    await fs.promises.writeFile(timestampedPath, buffer);

    const imageUrl = `/images/cover-${timestamp}.png`;

    return NextResponse.json({
      success: true,
      url: imageUrl,
      timestamp,
    });
  } catch (error) {
    console.error("Error uploading cover image:", error);
    return NextResponse.json(
      { success: false, error: "Failed to upload cover image" },
      { status: 500 }
    );
  }
}
