import { application, type Request, type Response } from "express";
import { prisma } from "../libs/prisma";

export const createApplication = async (req: Request, res: Response) => {
  const { company, role, jobDescription, status } = req.body;

  const userId = req.userId;

  if (!userId) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  try {
    const application = await prisma.application.create({
      data: {
        company,
        role,
        jobDescription,
        status,
        userId,
      },
    });
    return res.status(201).json({
      message: "Application Created!!",
      application,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error!",
    });
  }
};

export const getApplication = async (req: Request, res: Response) => {
  const userId = req.userId;

  if (!userId) {
    return res.status(401).json({
      message: "Unauthorized!",
    });
  }

  try {
    const application = await prisma.application.findMany({
      where: { userId: userId },
    });
    return res.status(200).json({
      application,
    });
  } catch (err0) {
    return res.status(500).json({
      message: "Internal server error!!",
    });
  }
};

export const getApplicationById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const userId = req.userId;

  if (!userId) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  if (!id) {
    return res.status(401).json({
      message: "User not found!!",
    });
  }

  try {
    const application = await prisma.application.findUnique({
      where: { id: id, userId: userId },
    });

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    return res.status(200).json({
      application,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const updateApplication = async (req: Request, res: Response) => {
  const { company, role, jobDescription, status } = req.body;
  const id = Number(req.params.id);

  const userId = req.userId;

  if (!userId) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  if (!id) {
    return res.status(401).json({
      message: "User not found!!",
    });
  }

  try {
    const application = await prisma.application.update({
      where: { id: id, userId: userId },
      data: {
        company: company,
        role: role,
        jobDescription: jobDescription,
        status: status,
      },
    });
    return res.status(200).json({
      message: "Application Updated!!",
      application,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error!",
    });
  }
};

export const deleteApplication = async (req: Request, res: Response) => {
  const userId = req.userId;
  const id = Number(req.params.id);

  if (!userId) {
    return res.status(401).json({
      message: "Unauthorized!",
    });
  }
  if (!id) {
    return res.status(401).json({
      message: "User not found!!",
    });
  }

  try {
    const application = await prisma.application.delete({
      where: { id: id, userId: userId },
    });
    return res.status(200).json({
      message: "Application deleted!!",
    });
  } catch (err0) {
    return res.status(500).json({
      message: "Internal server error!!",
    });
  }
};
