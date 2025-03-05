import { CustomError } from "./CustomError";
// import logger from "../utils/logger";


export class NotFoundError extends CustomError {
  statusCode = 404;
  message = "Not Found";

  constructor(message = "Not Found") {
    super(message);
    this.message = message;

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    // logger.error(message)
    return [{ message: this.message }];
  }
}
