import { RequestHandler } from "express";
import { userService } from "../services/user.service";
import { IUser, IDevice, OTPMethodEnum } from "../types/types";

class AuthController {
  sendOTP: RequestHandler<
    unknown,
    { sent: boolean; otp: string },
    { emailOrPhone: string; method: OTPMethodEnum }
  > = async (req, res) => {
    const { otp } = await userService.sendOTP(
      req.body.emailOrPhone,
      req.body.method
    );
    res.json({ sent: true, otp }).status(200).send();
  };

  validateOTP: RequestHandler<
    unknown,
    {
      user: IUser;
      accessToken: string;
      refreshToken: string;
    },
    {
      emailOrPhone: string;
      otp: string;
      device: IDevice;
      method: OTPMethodEnum;
    }
  > = async (req, res) => {
    const { accessToken, refreshToken, user } = await userService.validateOTP(
      req.body.emailOrPhone,
      req.body.otp,
      req.body.device,
      req.body.method
    );

    res.json({ user, accessToken, refreshToken });
  };

  authenticate: RequestHandler<unknown, IUser, { token: string }> = async (
    req,
    res
  ) => {
    const user = await userService.authenticate(req.body.token);
    res.json(user);
  };

  refreshToken: RequestHandler<
    unknown,
    {
      accessToken: string;
      refreshToken: string;
    },
    {
      refreshToken: string;
      device: IDevice;
    }
  > = async (req, res) => {
    const { accessToken, refreshToken } = await userService.refreshToken(
      req.body.refreshToken,
      req.body.device
    );

    res.json({ accessToken, refreshToken });
  };
}

export const authController = Object.freeze(new AuthController());
