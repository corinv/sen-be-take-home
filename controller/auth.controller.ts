import { NextFunction, Request, Response } from "express";
// import * as authService from '../service/auth.service';
import { AuthParams } from "../interfaces/auth.interface";
import { AuthService } from "../service/auth.service.js";
import { InvalidCredentialsError } from "../service/errors.js";

export class AuthController {
  constructor(private authService: AuthService) {}
  login = async (
    req: Request<{}, {}, AuthParams>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const loginResponse = await this.authService.authenticateUser(
        req.body.email,
        req.body.password
      );
      if (!loginResponse) {
        throw new InvalidCredentialsError();
      }
      res.json(loginResponse);
    } catch (err) {
      next(err);
    }
  };
  signup = async (
    req: Request<{}, {}, AuthParams>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const signupResponse = await this.authService.signup(
        req.body.email,
        req.body.password
      );
      if (!signupResponse) {
        throw new InvalidCredentialsError();
      }
      res.json(signupResponse);
    } catch (err) {
      next(err);
    }
  };
}
