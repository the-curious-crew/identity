import { RequestHandler } from "express";
import { ICRUDController } from "@shared/backend/lib/controllers/ICRUDController";
import { v1Response } from "@shared/backend/lib/lib/responseHandler";
import { IUser } from "@shared/types/lib/schemas/identity/user";
import { userService } from "../services/user.service";
import { IAPIResponse, IQueryStringParams } from "@shared/types/lib/types";
import { ParamsDictionary } from "express-serve-static-core";

class UserController implements ICRUDController {
  create: RequestHandler<ParamsDictionary, IAPIResponse<IUser>, IUser> = async (
    req,
    res
  ) => {
    const data = await userService.create(req.body);
    res.json(v1Response(data));
  };

  getAll: RequestHandler<
    ParamsDictionary,
    IAPIResponse<IUser[]>,
    unknown,
    { query: IQueryStringParams }
  > = async (req, res) => {
    const data = await userService.getAll(req.query.query);
    res.json(v1Response(data));
  };

  getById: RequestHandler<{ id: string }, IAPIResponse<IUser>> = async (
    req,
    res
  ) => {
    const data = await userService.getById(req.params.id);
    res.json(v1Response(data));
  };

  update: RequestHandler<{ id: string }, IAPIResponse<void>, Partial<IUser>> =
    async (req, res) => {
      await userService.update(req.params.id, req.body);
      res.json(v1Response(undefined));
    };

  delete: RequestHandler<
    { id: string } & ParamsDictionary,
    IAPIResponse<void>
  > = async (req, res) => {
    await userService.delete(req.params.id);
    res.json(v1Response(undefined));
  };
}

export const userController = Object.freeze(new UserController());
