// import { CustomError } from './CustomError';

// export class RequestValidationError extends CustomError {
//   statusCode = 400;

//   constructor(public errors: ValidationError[]) {
//     super('Invalid request');

//     // Only because we are extending a built in class
//     Object.setPrototypeOf(this, RequestValidationError.prototype);
//   }

//   serializeErrors() {
//     return this.errors.map(err => {
//       // return { message: err.msg, field: err.param };
//       return { message: err.msg, field: "err.param" };
//     });
//   }
// }
