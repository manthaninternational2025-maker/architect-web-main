import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_FILE_PATH = path.join(process.cwd(), "data", "journal-storage.json");

const NO_CACHE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
  "Pragma": "no-cache",
  "Expires": "0",
  "Surrogate-Control": "no-store",
};

export async function GET() {
  try {
    if (fs.existsSync(DATA_FILE_PATH)) {
      const fileData = await fs.promises.readFile(DATA_FILE_PATH, "utf-8");
      const parsed = JSON.parse(fileData);
      return NextResponse.json(
        { success: true, data: parsed, timestamp: Date.now() },
        { headers: NO_CACHE_HEADERS }
      );
    }
  } catch (error) {
    console.error("Error reading journal-storage.json:", error);
  }
  return NextResponse.json(
    { success: false, message: "Storage file not yet created" },
    { headers: NO_CACHE_HEADERS }
  );
}

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    let currentData: Record<string, any> = {};

    if (fs.existsSync(DATA_FILE_PATH)) {
      try {
        const fileData = await fs.promises.readFile(DATA_FILE_PATH, "utf-8");
        currentData = JSON.parse(fileData);
      } catch {}
    }

    const merged = { ...currentData, ...payload };

    // Ensure data directory exists
    const dir = path.dirname(DATA_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    await fs.promises.writeFile(DATA_FILE_PATH, JSON.stringify(merged, null, 2), "utf-8");
    return NextResponse.json(
      { success: true, data: merged, timestamp: Date.now() },
      { headers: NO_CACHE_HEADERS }
    );
  } catch (error) {
    console.error("Error saving to journal-storage.json:", error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500, headers: NO_CACHE_HEADERS }
    );
  }
}
