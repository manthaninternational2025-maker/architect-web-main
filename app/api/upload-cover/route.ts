import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const PUBLIC_IMAGES_DIR = path.join(process.cwd(), "public", "images");
const DEFAULT_COVER_PATH = path.join(PUBLIC_IMAGES_DIR, "manthan-cover-page-default.png");
const MAIN_COVER_PATH = path.join(PUBLIC_IMAGES_DIR, "manthan-cover-page.png");
const STORAGE_FILE_PATH = path.join(process.cwd(), "data", "journal-storage.json");

// Helper to update journal-storage.json
async function updateStorageCoverUrl(url: string) {
  try {
    let currentData: Record<string, any> = {};
    if (fs.existsSync(STORAGE_FILE_PATH)) {
      try {
        const fileContent = await fs.promises.readFile(STORAGE_FILE_PATH, "utf-8");
        currentData = JSON.parse(fileContent);
      } catch {}
    }
    currentData.sidebarConfig = {
      ...(currentData.sidebarConfig || {}),
      coverImageUrl: url,
    };
    const dir = path.dirname(STORAGE_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    await fs.promises.writeFile(STORAGE_FILE_PATH, JSON.stringify(currentData, null, 2), "utf-8");
  } catch (err) {
    console.warn("Could not sync cover to journal-storage.json:", err);
  }
}

export async function POST(req: NextRequest) {
  try {
    if (!fs.existsSync(PUBLIC_IMAGES_DIR)) {
      fs.mkdirSync(PUBLIC_IMAGES_DIR, { recursive: true });
    }

    // Ensure we keep a backup of the default official cover
    if (!fs.existsSync(DEFAULT_COVER_PATH) && fs.existsSync(MAIN_COVER_PATH)) {
      try {
        await fs.promises.copyFile(MAIN_COVER_PATH, DEFAULT_COVER_PATH);
      } catch {}
    }

    const contentType = req.headers.get("content-type") || "";
    let buffer: Buffer | null = null;

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const file = formData.get("file") as File | null;
      if (file) {
        const bytes = await file.arrayBuffer();
        buffer = Buffer.from(bytes);
      }
    } else if (contentType.includes("application/json")) {
      const body = await req.json();
      if (body.dataUrl) {
        const base64Data = body.dataUrl.replace(/^data:image\/\w+;base64,/, "");
        buffer = Buffer.from(base64Data, "base64");
      }
    }

    if (!buffer) {
      return NextResponse.json({ success: false, error: "No image content provided" }, { status: 400 });
    }

    const timestamp = Date.now();
    // 1. Save timestamped file for clean cache busting
    const timestampedFileName = `cover-${timestamp}.png`;
    const timestampedPath = path.join(PUBLIC_IMAGES_DIR, timestampedFileName);
    await fs.promises.writeFile(timestampedPath, buffer);

    // 2. Also update current active main cover
    try {
      await fs.promises.writeFile(MAIN_COVER_PATH, buffer);
    } catch {}

    const imageUrl = `/images/${timestampedFileName}`;

    // 3. Persist to server data storage
    await updateStorageCoverUrl(imageUrl);

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

// Reset cover to official default
export async function DELETE() {
  try {
    if (fs.existsSync(DEFAULT_COVER_PATH)) {
      await fs.promises.copyFile(DEFAULT_COVER_PATH, MAIN_COVER_PATH);
    }

    const defaultUrl = `/images/manthan-cover-page.png?v=${Date.now()}`;
    await updateStorageCoverUrl(defaultUrl);

    return NextResponse.json({
      success: true,
      url: defaultUrl,
      message: "Cover page reset to default official Manthan cover",
    });
  } catch (error) {
    console.error("Error resetting cover image:", error);
    return NextResponse.json(
      { success: false, error: "Failed to reset cover image" },
      { status: 500 }
    );
  }
}

