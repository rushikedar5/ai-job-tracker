import type { Request, Response } from "express";
import { prisma } from "../libs/prisma";

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
    return res.status(201).json({
      fileContent,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
