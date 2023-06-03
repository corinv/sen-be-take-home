import { Request, Response, NextFunction, User } from "express";
import Middleware from "../utils/middleware.js";
import { AuthService } from "../service/auth.service.js";
// import logger from '../logger';

export class AuthMiddleware extends Middleware {
  constructor(private authService: AuthService) {
    super();
  }

  implementation = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    this.authService.passport.authenticate(
      "jwt",
      { session: false },
      (err: any, user: User, _info: object) => {
        if (err) {
          next(err);
        }
        if (!user) {
          next(new Error("Not authenticated"));
        }
        if (user) {
          req.user = user;
        }

        next();
      }
    )(req, res, next);
  };
}
