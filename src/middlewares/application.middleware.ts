import type { NextFunction, Request, Response } from "express";
import { applicationSchema } from "../validators/application.validator";

export const validateApplication = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = applicationSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: result.error.message,
    });
  }

  next();
};
