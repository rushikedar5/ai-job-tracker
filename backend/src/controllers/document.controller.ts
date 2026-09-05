import type { Request, Response } from "express";
import prisma from "../libs/prisma";
import aiClient from "../libs/groq";
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

    const fileContent = await prisma.document.create({
      data: {
        filename: file.originalname,
        url: file.path,
        userId,
      },
    });

    const fileResponse = await axios.get(file.path, {
      responseType: "arraybuffer",
    });
    
    console.log("File PATH:", file.path);
    console.log("File Response Headers:", fileResponse.headers);
    console.log("Buffer length:", fileResponse.data.byteLength);

    const fileBuffer = Buffer.from(fileResponse.data);
    const pdfData = await pdfParse(fileBuffer);
    const resumeText = pdfData.text;

    const response = await aiClient.chat.completions.create({
      model: "openai/gpt-oss-20b",
      response_format: { type: "json_object" },
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

    const rawContent = response.choices[0].message.content || "{}";
    const cleanContent = rawContent.replace(/```json\n?|\n?```/g, "").trim();
    
    let feedback;
    try {
      feedback = JSON.parse(cleanContent);
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError, "Raw content:", rawContent);
      return res.status(500).json({ message: "Failed to parse AI response" });
    }

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
