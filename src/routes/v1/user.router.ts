import { Router } from "express";
import { userController } from "../../controllers/user.controller";
import { jsonParseQueryParamsMiddleware } from "@shared/backend/lib/middlewares/jsonParseQueryParams.middleware";

const userRouter = Router();

userRouter.post("/", userController.create);
userRouter.get("/", jsonParseQueryParamsMiddleware, userController.getAll);
userRouter.get("/:id", userController.getById);
userRouter.put("/:id", userController.update);
userRouter.delete("/:id", userController.delete);

export { userRouter };