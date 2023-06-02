import { NextFunction, Request, Response } from "express";
import logger from "../logger";

export function errorFunction(
  err: { name: string; statusCode?: number; message?: string },
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  logger.error(err);

  res.status(err.statusCode || 500).send({
    name: err.name,
    status: err.statusCode || 500,
    message: err.message || "Error",
  });
}

export class ApplicationError extends Error {
  statusCode: number;

  constructor(message: string, name?: string, statusCode?: number) {
    super();
    this.message = message;
    this.name = name || this.constructor.name;
    this.statusCode = statusCode || 500;
  }
}
