import { Strategy, StrategyOptions, ExtractJwt } from "passport-jwt";
import jwt from "jsonwebtoken";
import passport, { PassportStatic } from "passport";
import { UsersService } from "./users.service.js";
import { User } from "../interfaces/users.interface.js";
import { AuthResponse } from "../interfaces/auth.interface.js";

export class AuthService {
  secret: string;
  expiry = 1209600; // 2 weeks in seconds
  _passport: PassportStatic;
  constructor(private usersService: UsersService) {
    this.secret = process.env.JWT_SECRET || "";
    if (!this.secret) {
      this.secret = "defaultsecret";
      console.error(
        'ERROR: JWT Secret has not been set via env var "JWT_SECRET"'
      );
    }
    this._passport = passport.use(this.getJWTStrategy());
  }

  get passport(): PassportStatic {
    return this._passport;
  }

  getJWTStrategy = (): Strategy => {
    const options: StrategyOptions = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
      secretOrKey: this.secret,
    };
    return new Strategy(options, async (payload, done) => {
      const user = await this.usersService.findById(payload.id);
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    });
  };
  getUserJWT = (user: User): string => {
    return jwt.sign(
      {
        id: user.id, // other info can be stored if relevant to the frontend
      },
      this.secret,
      {
        expiresIn: this.expiry,
      }
    );
  };
  authenticateUser = async (
    email: string,
    password: string
  ): Promise<AuthResponse | undefined> => {
    const user = await this.usersService.validateCredentials(email, password);

    if (!user) return;

    return {
      id: user.id,
      token: this.getUserJWT(user),
    };
  };
  signup = async (email: string, password: string): Promise<AuthResponse> => {
    const user = await this.usersService.create(email, password);

    return {
      id: user.id,
      token: this.getUserJWT(user),
    };
  };
}
