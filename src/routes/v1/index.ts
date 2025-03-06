import { Router } from "express";
import { authRouter } from "./auth.router";
import { userRouter } from "./user.router";

const v1Router = Router();

v1Router.use("/auth", authRouter);
v1Router.use("/users", userRouter);

export { v1Router };
