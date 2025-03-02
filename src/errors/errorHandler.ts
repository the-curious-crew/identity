import { ErrorRequestHandler } from "express";
import { CustomError } from "./CustomError";
import { IAPIResponse } from "@shared/types/lib/types";

export const errorHandler: ErrorRequestHandler<unknown, IAPIResponse> = (
  err,
  req,
  res,
  next
) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof CustomError) {
    const errors = err.serializeErrors();
    res.status(err.statusCode).send({
      success: false,
      // locale: Locale.enUS,
      errors: errors.map((error) => error.message),
    });
  } else {
    console.error("Error", err);
    res.status(400).send({
      success: false,
      // locale: Locale.enUS,
      errors: ["Something went wrong"],
    });
  }
};
