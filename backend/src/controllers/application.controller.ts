import { type Request, type Response } from "express";
import prisma from "../libs/prisma";

export const createApplication = async (req: Request, res: Response) => {
  const { company, role, jobDescription, status } = req.body;
  const userId = req.userId;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const application = await prisma.application.create({
      data: { company, role, jobDescription, status, userId },
    });
    return res.status(201).json({ message: "Application Created!!", application });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error!" });
  }
};

export const getApplication = async (req: Request, res: Response) => {
  const userId = req.userId;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized!" });
  }

  try {
    const [application, user] = await Promise.all([
      prisma.application.findMany({ where: { userId } }),
      prisma.user.findUnique({
        where: { id: userId },
        select: { plan: true, reviewCount: true }
      })
    ])

    return res.status(200).json({ application, user });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error!!" });
  }
};

export const getApplicationById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const userId = req.userId;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (!id) {
    return res.status(400).json({ message: "Invalid application id" });
  }

  try {
    const application = await prisma.application.findUnique({
      where: { id, userId },
    });

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    return res.status(200).json({ application });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateApplication = async (req: Request, res: Response) => {
  const { company, role, jobDescription, status } = req.body;
  const id = Number(req.params.id);
  const userId = req.userId;

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (!id) {
    return res.status(400).json({ message: "Invalid application id" });
  }

  try {
    const application = await prisma.application.update({
      where: { id, userId },
      data: { company, role, jobDescription, status },
    });
    return res.status(200).json({ message: "Application Updated!!", application });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error!" });
  }
};

export const deleteApplication = async (req: Request, res: Response) => {
  const userId = req.userId;
  const id = Number(req.params.id);

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized!" });
  }

  if (!id) {
    return res.status(400).json({ message: "Invalid application id" });
  }

  try {
    await prisma.application.delete({ where: { id, userId } });
    return res.status(200).json({ message: "Application deleted!!" });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error!!" });
  }
};