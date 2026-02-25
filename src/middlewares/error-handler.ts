import { Request, Response, NextFunction } from "express";
import { DefaultError } from "../shared/exceptions";
import { StatusHttpEnum } from "../shared/enums";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof DefaultError) {
    return res
      .status(err.statusCode)
      .json({ message: err.message, statusCode: err.statusCode });
  }
  res
    .status(StatusHttpEnum.INTERNAL_SERVER_ERROR)
    .json({
      message: "Erro interno do servidor",
      statusCode: StatusHttpEnum.INTERNAL_SERVER_ERROR,
    });
};
