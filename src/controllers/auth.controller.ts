import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import {prisma} from "../libs/prisma";
import jwt from "jsonwebtoken";

export const signUp = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (user) {
    return res.status(400).json({
      message: "Email already in use",
    });
  } 

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });

  return res.status(201).json({
    message: "User created",
    data: {
      email,
      name,
    },
  });
};

export const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }

  const checkPassword = await bcrypt.compare(password, user.password);

  if (!checkPassword) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }

  const token = jwt.sign(
    {
      userId: user.id,
    },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" },
  );

  return res.status(200).json({ token })
};
