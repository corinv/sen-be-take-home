import { NextFunction, Request, Response } from "express";
import * as userService from "../service/users.service";
import { User } from "../interfaces/users.interface";

export const getCurrent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.user!;
    const user = await userService.getUser(id);
    return res.send(user);
  } catch (err) {
    next(err);
  }
};

export const updateCurrent = async (
  req: Request<{ id: string }, {}, User>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = req;
    const { id } = req.user!;
    const updatedUser = await userService.update(id, body);
    return res.send(updatedUser);
  } catch (err) {
    next(err);
  }
};
