import type { Request, Response } from "express";
import prisma from "../libs/prisma";
import { reviewResume, ReviewParseError, MIN_RESUME_CHARS } from "../libs/resumeReview";
import pdfParse from "pdf-parse";
import axios from "axios";

export const uploadDocument = async (req: Request, res: Response) => {
  const file = req.file;
  const userId = req.userId;

  if (!file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (user?.plan === "free" && user?.reviewCount >= 5) {
      return res.status(403).json({
        message: "Free limit reached. Upgrade to Pro.",
      });
    }

    const fileResponse = await axios.get(file.path, {
      responseType: "arraybuffer",
    });
    
    console.log("File PATH:", file.path);
    console.log("File Response Headers:", fileResponse.headers);
    console.log("Buffer length:", fileResponse.data.byteLength);

    const fileBuffer = Buffer.from(fileResponse.data);
    const pdfData = await pdfParse(fileBuffer);
    const resumeText = pdfData.text.trim();

    // Scanned or image-only PDFs have no text layer; don't ask the model to review nothing.
    if (resumeText.length < MIN_RESUME_CHARS) {
      return res.status(422).json({
        message: "We couldn't read text from this PDF. Please upload a text-based PDF, not a scan or image.",
      });
    }

    let feedback;
    try {
      feedback = await reviewResume(resumeText);
    } catch (reviewError) {
      if (reviewError instanceof ReviewParseError) {
        console.error(reviewError.message, "Raw outputs:", reviewError.rawOutputs);
        return res.status(502).json({
          message: "The AI returned an unusable response. Please try again.",
        });
      }
      throw reviewError;
    }

    // Save the document only after a successful review, so failures leave no orphan rows.
    const fileContent = await prisma.document.create({
      data: {
        filename: file.originalname,
        url: file.path,
        userId,
      },
    });

    await prisma.user.update({
      where: { id: userId },
      data: { reviewCount: { increment: 1 } },
    });

    return res.status(201).json({
      document: fileContent,
      feedback,
    });
  } catch (err: any) {
    console.error("Upload Document Error:", err.message || err);
    return res.status(500).json({
      message: err.message || "Failed to process resume upload.",
    });
  }
};
