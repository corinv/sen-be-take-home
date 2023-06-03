import { NextFunction, Request, RequestHandler, Response } from "express";

abstract class Middleware {
  abstract implementation(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;

  toExpress(): RequestHandler {
    return this.implementation as RequestHandler;
  }
}

export default Middleware;
