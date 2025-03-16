import { ErrorRequestHandler } from "express";
import { CustomError } from "./CustomError";

export const errorHandler: ErrorRequestHandler<unknown> = (
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
      message: err,
      errors: ["Something went wrong"],
    });
  }
};
