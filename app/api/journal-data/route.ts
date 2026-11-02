import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_FILE_PATH = path.join(process.cwd(), "data", "journal-storage.json");
const TMP_FILE_PATH = path.join("/tmp", "journal-storage.json");

const NO_CACHE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
  "Pragma": "no-cache",
  "Expires": "0",
  "Surrogate-Control": "no-store",
};

declare global {
  // eslint-disable-next-line no-var
  var __JOURNAL_DATA__: Record<string, any> | undefined;
}

function readStoredData(): Record<string, any> {
  // 1. Check in-memory global cache first
  let data: Record<string, any> = globalThis.__JOURNAL_DATA__ ? { ...globalThis.__JOURNAL_DATA__ } : {};

  // 2. Read from local project data directory if present
  try {
    if (fs.existsSync(DATA_FILE_PATH)) {
      const fileData = fs.readFileSync(DATA_FILE_PATH, "utf-8");
      const parsed = JSON.parse(fileData);
      data = { ...parsed, ...data };
    }
  } catch {}

  // 3. Read from serverless /tmp fallback if present
  try {
    if (fs.existsSync(TMP_FILE_PATH)) {
      const tmpData = fs.readFileSync(TMP_FILE_PATH, "utf-8");
      const parsed = JSON.parse(tmpData);
      data = { ...parsed, ...data };
    }
  } catch {}

  return data;
}

export async function GET() {
  try {
    const data = readStoredData();
    if (data && Object.keys(data).length > 0) {
      return NextResponse.json(
        { success: true, data, timestamp: Date.now() },
        { headers: NO_CACHE_HEADERS }
      );
    }
  } catch (error) {
    console.error("Error reading journal data:", error);
  }

  return NextResponse.json(
    { success: false, message: "Storage file not yet populated" },
    { headers: NO_CACHE_HEADERS }
  );
}

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    const currentData = readStoredData();
    const merged = { ...currentData, ...payload };

    // Update in-memory global cache
    globalThis.__JOURNAL_DATA__ = merged;

    // Try persisting to project data directory
    try {
      const dir = path.dirname(DATA_FILE_PATH);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(merged, null, 2), "utf-8");
    } catch {
      // In serverless / read-only filesystem, persist to /tmp
      try {
        fs.writeFileSync(TMP_FILE_PATH, JSON.stringify(merged, null, 2), "utf-8");
      } catch {}
    }

    return NextResponse.json(
      { success: true, data: merged, timestamp: Date.now() },
      { headers: NO_CACHE_HEADERS }
    );
  } catch (error) {
    console.error("Error saving journal data:", error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500, headers: NO_CACHE_HEADERS }
    );
  }
}
