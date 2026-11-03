import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const PUBLIC_EDITORIAL_DIR = path.join(process.cwd(), "public", "images", "editorial");
const STORAGE_FILE_PATH = path.join(process.cwd(), "data", "journal-storage.json");

// Helper to update journal-storage.json with new member photoUrl
async function updateMemberPhotoInStorage(memberId: number, photoUrl: string) {
  try {
    let currentData: Record<string, any> = {};
    if (fs.existsSync(STORAGE_FILE_PATH)) {
      try {
        const fileContent = await fs.promises.readFile(STORAGE_FILE_PATH, "utf-8");
        currentData = JSON.parse(fileContent);
      } catch {}
    }

    if (Array.isArray(currentData.members)) {
      currentData.members = currentData.members.map((m: any) => {
        if (m.id === memberId) {
          return {
            ...m,
            photoUrl,
            photoData: "", // Clear base64 so JSON stays lightweight
          };
        }
        return m;
      });
    }

    const dir = path.dirname(STORAGE_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    await fs.promises.writeFile(STORAGE_FILE_PATH, JSON.stringify(currentData, null, 2), "utf-8");
  } catch (err) {
    console.warn("Could not sync member photo to journal-storage.json:", err);
  }
}

export async function POST(req: NextRequest) {
  try {
    if (!fs.existsSync(PUBLIC_EDITORIAL_DIR)) {
      fs.mkdirSync(PUBLIC_EDITORIAL_DIR, { recursive: true });
    }

    const contentType = req.headers.get("content-type") || "";
    let buffer: Buffer | null = null;
    let memberId: number | null = null;
    let fileExtension = "png";

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const file = formData.get("file") as File | null;
      const idRaw = formData.get("memberId") as string | null;
      if (idRaw) {
        memberId = parseInt(idRaw, 10);
      }

      if (file) {
        const originalName = file.name || "";
        const dotIdx = originalName.lastIndexOf(".");
        if (dotIdx > -1) {
          const ext = originalName.slice(dotIdx + 1).toLowerCase();
          if (["png", "jpg", "jpeg", "webp", "gif"].includes(ext)) {
            fileExtension = ext === "jpeg" ? "jpg" : ext;
          }
        }
        const bytes = await file.arrayBuffer();
        buffer = Buffer.from(bytes);
      }
    } else if (contentType.includes("application/json")) {
      const body = await req.json();
      if (body.memberId) {
        memberId = parseInt(String(body.memberId), 10);
      }
      if (body.dataUrl) {
        const matches = body.dataUrl.match(/^data:image\/(\w+);base64,(.+)$/);
        if (matches) {
          fileExtension = matches[1].toLowerCase() === "jpeg" ? "jpg" : matches[1].toLowerCase();
          buffer = Buffer.from(matches[2], "base64");
        } else {
          const base64Data = body.dataUrl.replace(/^data:image\/\w+;base64,/, "");
          buffer = Buffer.from(base64Data, "base64");
        }
      }
    }

    if (!buffer || buffer.length === 0) {
      return NextResponse.json(
        { success: false, error: "No image content provided" },
        { status: 400 }
      );
    }

    const timestamp = Date.now();
    const idSlug = memberId ? `member-${memberId}` : `member-custom`;
    const fileName = `${idSlug}-${timestamp}.${fileExtension}`;
    const filePath = path.join(PUBLIC_EDITORIAL_DIR, fileName);

    // Save pristine, uncompressed original file to disk
    await fs.promises.writeFile(filePath, buffer);

    const imageUrl = `/images/editorial/${fileName}`;

    // Update journal-storage.json if memberId is specified
    if (memberId && !isNaN(memberId)) {
      await updateMemberPhotoInStorage(memberId, imageUrl);
    }

    return NextResponse.json({
      success: true,
      url: imageUrl,
      timestamp,
    });
  } catch (error) {
    console.error("Error uploading member photo:", error);
    return NextResponse.json(
      { success: false, error: "Failed to upload member photo" },
      { status: 500 }
    );
  }
}
