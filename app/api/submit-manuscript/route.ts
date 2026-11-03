import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const STORAGE_FILE_PATH = path.join(process.cwd(), "data", "journal-storage.json");
const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads", "manuscripts");

// Helper to sanitize file names for safe storage
function sanitizeFilename(name: string): string {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_");
}

export async function POST(req: NextRequest) {
  try {
    if (!fs.existsSync(UPLOADS_DIR)) {
      fs.mkdirSync(UPLOADS_DIR, { recursive: true });
    }

    const contentType = req.headers.get("content-type") || "";
    let formDataObj: Record<string, any> = {};
    let manuscriptFileUrl = "";
    let manuscriptFileName = "";
    let manuscriptFileSize = "";
    let undertakingFileUrl = "";
    let undertakingFileName = "";
    let undertakingFileSize = "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();

      formData.forEach((value, key) => {
        if (typeof value === "string") {
          formDataObj[key] = value;
        }
      });

      // Save Manuscript File
      const manuscriptFile = formData.get("manuscriptFile") as File | null;
      if (manuscriptFile && manuscriptFile.size > 0) {
        try {
          const timestamp = Date.now();
          const safeName = sanitizeFilename(manuscriptFile.name);
          const savedName = `manuscript-${timestamp}-${safeName}`;
          const filePath = path.join(UPLOADS_DIR, savedName);
          const bytes = await manuscriptFile.arrayBuffer();
          await fs.promises.writeFile(filePath, Buffer.from(bytes));
          manuscriptFileUrl = `/uploads/manuscripts/${savedName}`;
          manuscriptFileName = manuscriptFile.name;
          manuscriptFileSize = `${(manuscriptFile.size / 1024).toFixed(1)} KB`;
        } catch (fileErr) {
          console.warn("Could not write manuscript file to disk:", fileErr);
          manuscriptFileName = manuscriptFile.name;
        }
      }

      // Save Undertaking File
      const undertakingFile = formData.get("undertakingFile") as File | null;
      if (undertakingFile && undertakingFile.size > 0) {
        try {
          const timestamp = Date.now();
          const safeName = sanitizeFilename(undertakingFile.name);
          const savedName = `undertaking-${timestamp}-${safeName}`;
          const filePath = path.join(UPLOADS_DIR, savedName);
          const bytes = await undertakingFile.arrayBuffer();
          await fs.promises.writeFile(filePath, Buffer.from(bytes));
          undertakingFileUrl = `/uploads/manuscripts/${savedName}`;
          undertakingFileName = undertakingFile.name;
          undertakingFileSize = `${(undertakingFile.size / 1024).toFixed(1)} KB`;
        } catch (fileErr) {
          console.warn("Could not write undertaking file to disk:", fileErr);
          undertakingFileName = undertakingFile.name;
        }
      }
    } else {
      formDataObj = await req.json();
    }

    const {
      whatsapp = "",
      title = "",
      firstName = "",
      middleName = "",
      lastName = "",
      degree = "",
      email = "",
      phone = "",
      position = "",
      department = "",
      institute = "",
      address = "",
      city = "",
      state = "",
      country = "India",
      availableAsReviewer = "No",
      submissionType = "manuscript",
      manuscriptNo = "",
      paperTitle = "",
    } = formDataObj;

    const fullName = [title, firstName, middleName, lastName].filter(Boolean).join(" ").trim() || email || whatsapp || "Unknown Author";
    const trackingCode = `IMJSI-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const dateStr = new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    // Detailed submission summary for the Inbox
    const contentLines = [
      `Tracking ID: ${trackingCode}`,
      `Submission Type: ${submissionType === "status_check" ? "Manuscript Status Inquiry" : "Manuscript Submission"}`,
      `Author: ${fullName}`,
      `WhatsApp: ${whatsapp}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : "",
      degree ? `Degree/Qualification: ${degree}` : "",
      position ? `Position/Designation: ${position}` : "",
      department ? `Department: ${department}` : "",
      institute ? `Institute/University: ${institute}` : "",
      [address, city, state, country].filter(Boolean).length > 0
        ? `Location: ${[address, city, state, country].filter(Boolean).join(", ")}`
        : "",
      `Available as Reviewer: ${availableAsReviewer}`,
      paperTitle ? `Article Title: ${paperTitle}` : "",
      manuscriptNo ? `Referenced Manuscript No: ${manuscriptNo}` : "",
      manuscriptFileName ? `Attached Manuscript: ${manuscriptFileName} (${manuscriptFileSize || "Uploaded"})` : "",
      undertakingFileName ? `Attached Undertaking: ${undertakingFileName} (${undertakingFileSize || "Uploaded"})` : "",
    ].filter(Boolean);

    const newMessage = {
      id: Date.now(),
      sender: fullName,
      email: email || "no-reply@manthanjournal.com",
      whatsapp: whatsapp || "",
      subject: submissionType === "status_check"
        ? `Status Inquiry: ${manuscriptNo || trackingCode} (${fullName})`
        : `New Manuscript Submission: ${manuscriptFileName || fullName} (${trackingCode})`,
      date: dateStr,
      isRead: false,
      content: contentLines.join("\n"),
      trackingId: trackingCode,
      submissionType,
      manuscriptFileUrl,
      manuscriptFileName,
      undertakingFileUrl,
      undertakingFileName,
    };

    // Read and update journal-storage.json
    let currentData: Record<string, any> = {};
    if (fs.existsSync(STORAGE_FILE_PATH)) {
      try {
        const fileContent = await fs.promises.readFile(STORAGE_FILE_PATH, "utf-8");
        currentData = JSON.parse(fileContent);
      } catch {}
    }

    const existingMessages = Array.isArray(currentData.messages) ? currentData.messages : [];
    const updatedMessages = [newMessage, ...existingMessages];
    currentData.messages = updatedMessages;

    // Update in-memory global cache
    if (globalThis.__JOURNAL_DATA__) {
      globalThis.__JOURNAL_DATA__.messages = updatedMessages;
    }

    try {
      const dir = path.dirname(STORAGE_FILE_PATH);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      await fs.promises.writeFile(STORAGE_FILE_PATH, JSON.stringify(currentData, null, 2), "utf-8");
    } catch (saveErr) {
      console.warn("Could not write updated messages to journal-storage.json:", saveErr);
    }

    return NextResponse.json({
      success: true,
      trackingId: trackingCode,
      message: "Your submission has been received and logged in the Editorial Inbox.",
      data: newMessage,
    });
  } catch (error) {
    console.error("Error in submit-manuscript route:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to process submission. Please email manthaninternational2025@gmail.com if this persists.",
      },
      { status: 500 }
    );
  }
}
