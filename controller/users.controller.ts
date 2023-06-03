import { NextFunction, Request, Response } from "express";
import { UsersService } from "../service/users.service";
import { User } from "../interfaces/users.interface";

export class UsersController {
  constructor(private usersService: UsersService) {}
  getCurrent = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.user!;
      const user = await this.usersService.findById(id);
      return res.json(user);
    } catch (err) {
      next(err);
    }
  };

  updateCurrent = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body } = req;
      const { id } = req.user!;
      const updatedUser = await this.usersService.update(id, {
        password: body.password,
        email: body.email,
      });
      return res.json(updatedUser);
    } catch (err) {
      next(err);
    }
  };
}
