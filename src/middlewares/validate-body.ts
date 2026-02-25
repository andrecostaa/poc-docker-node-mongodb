import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";
import { StatusHttpEnum } from "../shared/enums";

export const validateBody = <T extends z.ZodType>(schema: T) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);
    if (result.success) {
      req.body = result.data;
      next();
      return;
    }
    const error = result.error as ZodError;
    res.status(StatusHttpEnum.BAD_REQUEST).json({
      message: "Erro de validação",
      statusCode: StatusHttpEnum.BAD_REQUEST,
      errors: error.flatten().fieldErrors,
    });
  };
};
