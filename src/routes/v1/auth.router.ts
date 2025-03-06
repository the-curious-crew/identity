import { Router } from "express";
import { authController } from "../../controllers/auth.controller";

const authRouter = Router();

authRouter.post("/send-otp", authController.sendOTP);
authRouter.post("/validate-otp", authController.validateOTP);
authRouter.post("/authenticate", authController.authenticate);
authRouter.post("/refresh-token", authController.refreshToken);

export { authRouter };