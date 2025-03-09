require("dotenv").config();
import "express-async-errors";

import express from "express";
import cors from "cors";
import helmet from "helmet";
import { router } from "./routes";

import { NotFoundError } from "./errors/NotFoundError";
import { errorHandler } from "./errors/errorHandler";
import { morganMiddleware } from "./middlewares/morgan.middleware";
import { ipRestrictionMiddleware } from "./middlewares/ipRestriction.middleware";
import { connectDB } from "./lib/mongoose.utils";
import { setupSwagger } from "./swagger/swagger";

const app = express();

connectDB();

app.use(morganMiddleware);
app.use(cors());

// Apply the IP-based access control middleware to all routes
const allowList =
  process.env.ALLOWED_IP_LIST?.split(",").map((ip) => ip.trim()) || [];

app.use(ipRestrictionMiddleware(allowList));
app.use(helmet()); // https://expressjs.com/en/advanced/best-practice-security.html#use-helmet

app.use(express.json()); // Parses JSON request body
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded form data

// Graceful shutdown function
function gracefulShutdown() {
  console.log("Shutting down gracefully...");
  setTimeout(() => {
    console.error(
      "Could not close connections in time, forcefully shutting down"
    );
    process.exit(1);
  }, 10000); // 10 seconds
}

// For nodemon restarts
process.once("SIGUSR2", function () {
  gracefulShutdown();
  process.kill(process.pid, "SIGUSR2");
});
// For app termination
process.on("SIGINT", gracefulShutdown);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
setupSwagger(app);

app.use("/", router);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  console.log("Not found: ", req.url);

  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
