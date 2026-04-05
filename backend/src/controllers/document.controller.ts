import type { Request, Response } from "express";
import prisma from "../libs/prisma";
import aiClient from "../libs/groq";
import fs from "fs";
import pdfParse from "pdf-parse";

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
    const fileContent = await prisma.document.create({
      data: {
        filename: file.originalname,
        url: file.path,
        userId,
      },
    });

    const fileBuffer = fs.readFileSync(file.path);
    const pdfData = await pdfParse(fileBuffer);
    const resumeText = pdfData.text;

    const response = await aiClient.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content:
            "You are an expert HR consultant and resume reviewer. Always respond with valid JSON only. No markdown, no extra text.",
        },
        {
          role: "user",
          content: `Review this resume and respond with this exact JSON structure:
        {
            "ats score": <number out of 100>,
            "strengths": [<list of strings>],
            "improvements": [<list of strings>],
            "suggestions": [<list of strings>]
        }

            Resume:
            ${resumeText}`,
        },
      ],
    });

    const feedback = JSON.parse(response.choices[0].message.content!);

    return res.status(201).json({
      document: fileContent,
      feedback,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error" + err,
    });
  }
};
