import { Router } from "express";
import { authController } from "../../controllers/auth.controller";

const authRouter = Router();

/**
 * @swagger
 * /v1/auth/send-otp:
 *   post:
 *     summary: Send OTP
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               value:
 *                 type: string
 *                 example: "john.doe@example.com"
 *               method:
 *                 type: string
 *                 enum: [AUTHENTICATOR_APP, OTP_MESSAGE]
 *                 example: "OTP_MESSAGE"
 *     responses:
 *       200:
 *         description: OTP sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "OTP sent successfully"
 *                 otp:
 *                   type: string
 *                   example: "123456"
 */
authRouter.post("/send-otp", authController.sendOTP);

/**
 * @swagger
 * /v1/auth/validate-otp:
 *   post:
 *     summary: Validate OTP
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               value:
 *                 type: string
 *                 example: "john.doe@example.com"
 *               otp:
 *                 type: string
 *                 example: "123456"
 *               device:
 *                 type: string
 *                 example: "mobile"
 *               method:
 *                 type: string
 *                 enum: [AUTHENTICATOR_APP, OTP_MESSAGE]
 *                 example: "OTP_MESSAGE"
 *     responses:
 *       200:
 *         description: OTP validated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "OTP validated successfully"
 */
authRouter.post("/validate-otp", authController.validateOTP);

/**
 * @swagger
 * /v1/auth/authenticate:
 *   post:
 *     summary: Authenticate
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *     responses:
 *       200:
 *         description: Authentication successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Authentication successful"
 */
authRouter.post("/authenticate", authController.authenticate);

/**
 * @swagger
 * /v1/auth/refresh-token:
 *   post:
 *     summary: Refresh Token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 example: "dGhpcyBpcyBhIHJlZnJlc2ggdG9rZW4="
 *               device:
 *                 type: string
 *                 example: "mobile"
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Token refreshed successfully"
 */
authRouter.post("/refresh-token", authController.refreshToken);

export { authRouter };