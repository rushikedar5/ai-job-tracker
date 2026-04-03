import type { NextFunction, Request, Response } from "express";
import { signInSchema, signUpSchema } from "../validators/auth.validator"


export const validateSignUp = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = signUpSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: result.error.message,
    });
  }

  next();
};

export const validateSignIn = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = signInSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: result.error.message,
    });
  }

  next();
};
