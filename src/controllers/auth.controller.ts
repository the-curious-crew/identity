import { RequestHandler } from "express";
import { userService } from "../services/user.service";
import { IUser, IDevice, OTPMethodEnum } from "../types/types";
import Bowser from "bowser";
import { v4 as uuidv4 } from "uuid";
import { getAccessTokenExpiry, getRefreshTokenExpiry } from "../lib/utils";

class AuthController {
  signup: RequestHandler<unknown, IUser, { email: string; phone: string }> =
    async (req, res) => {
      const user = await userService.signup(req.body.email, req.body.phone);
      res.json(user);
    };
  sendOTP: RequestHandler<
    unknown,
    { sent: boolean; otp: string },
    { value: string; method: OTPMethodEnum }
  > = async (req, res) => {
    const { otp } = await userService.sendOTP(req.body.value, req.body.method);
    res.json({ sent: true, otp }).status(200).send();
  };

  validateOTP: RequestHandler<
    unknown,
    {
      user: IUser;
    },
    {
      value: string;
      otp: string;
      device: IDevice;
      method: OTPMethodEnum;
    }
  > = async (req, res) => {
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const userAgent = req.headers["user-agent"] || "Unknown";
    const browser = Bowser.getParser(userAgent);
    const parsedResult = browser.getResult();

    const deviceId = uuidv4();

    const deviceInfo: IDevice = {
      ip_address: ip as string,
      user_agent: userAgent,
      device_type: parsedResult.platform.type || "desktop",
      device_name: parsedResult.platform.vendor
        ? `${parsedResult.platform.vendor} ${parsedResult.platform.model}`
        : "Unknown",
      os: `${parsedResult.os.name} ${parsedResult.os.version}`,
      browser: `${parsedResult.browser.name} ${parsedResult.browser.version}`,
      device_id: deviceId, // TODO: need to check how it works,
    };

    const { accessToken, refreshToken, user } = await userService.validateOTP(
      req.body.value,
      req.body.otp,
      deviceInfo,

      req.body.method
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: getAccessTokenExpiry() * 60 * 1000, // 15 minutes
      domain: process.env.COOKIE_DOMAIN,
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: getRefreshTokenExpiry() * 24 * 60 * 60 * 1000, // 30 days
      domain: process.env.COOKIE_DOMAIN,
    });
    res.cookie("deviceId", deviceId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: getRefreshTokenExpiry() * 24 * 60 * 60 * 1000, // 30 days
      domain: process.env.COOKIE_DOMAIN,
    });

    res.json({ user });
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
