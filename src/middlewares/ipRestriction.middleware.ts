import { RequestHandler } from "express-serve-static-core";
import { ForbiddenError } from "../errors/ForbiddenError";

export const ipRestrictionMiddleware = (allowList: string[]) => {
  return (req, res, next) => {
    const clientIP = req.ip;
    if (!allowList || !allowList.length || allowList.includes(clientIP!)) {
      next();
    } else {
      throw new ForbiddenError();
    }
  };
};
