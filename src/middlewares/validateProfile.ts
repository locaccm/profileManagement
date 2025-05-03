import { Request, Response, NextFunction } from "express";

export const validateProfileInput = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const { firstName, lastName, birthDate, address } = req.body;

  if (!firstName || !lastName || !birthDate || !address) {
    res.status(400).json({ error: "Missing or invalid required fields." });
    return;
  }

  next();
};
