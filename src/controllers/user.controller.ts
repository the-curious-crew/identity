import { RequestHandler } from "express";
import { userService } from "../services/user.service";
import { IUser } from "../types/types";

class UserController {
  create: RequestHandler<unknown, {}, IUser> = async (req, res) => {
    const user = await userService.create(req.body);
    res.status(201).json(user);
  };
}

export const userController = Object.freeze(new UserController());

