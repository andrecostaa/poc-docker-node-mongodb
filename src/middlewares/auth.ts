import { Request, Response, NextFunction } from "express";
import { logger } from "../shared/logger";

export const authMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  const token = req.headers.authorization;

  if (token) {
    logger.warn(
      { token: token.slice(0, 10) + "..." },
      "Placeholder auth: token provided but not validated",
    );
  }

  next();
};
