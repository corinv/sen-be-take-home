import { NextFunction, Request, Response } from "express";
import logger from "../logger";
import HttpStatusCode from "../utils/httpStatusCode.enum.js";

export function errorFunction(
  err: { name: string; statusCode?: number; message?: string },
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  logger.error(err);

  res.status(err.statusCode || HttpStatusCode.INTERNAL_SERVER_ERROR).send({
    name: err.name,
    status: err.statusCode || HttpStatusCode.INTERNAL_SERVER_ERROR,
    message: err.message || "Error",
  });
}

export class ApplicationError extends Error {
  statusCode: number;

  constructor(message: string, name?: string, statusCode?: number) {
    super();
    this.message = message;
    this.name = name || this.constructor.name;
    this.statusCode = statusCode || HttpStatusCode.INTERNAL_SERVER_ERROR;
  }
}
