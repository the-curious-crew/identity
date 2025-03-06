import { userRepository } from "../repositories/mongodb/user.mongo.repository";
import {
  IAccessTokenPayload,
  IDevice,
  IUser,
  OTPMethodEnum,
} from "../types/types";
import { sendOTPEmail, sendOTPPhone } from "../lib/otp";
import { authenticator, hotp } from "otplib";
import * as jwt from "jsonwebtoken";
import { NotFoundError } from "../errors/NotFoundError";
import { BadRequestError } from "../errors/BadRequestError";
import { generateTokens, refreshAccessToken } from "./token.service";
import { createHmac, randomBytes } from "crypto";
const VALIDITY_MINUTES = 3; // OTP validity in minutes
const otpStore = new Map<string, { otp: string; expiresAt: number }>();
const usedOTPs = new Map<string, string>();
class UserService {
  private repository: typeof userRepository;

  constructor(repository: typeof userRepository) {
    this.repository = repository;
  }

  async sendOTP(
    emailOrPhone: string,
    method: OTPMethodEnum
  ): Promise<{ otp: string }> {
    const user = await this.repository.getByEmailOrPhone(emailOrPhone);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    const otp = await this.generateOtp(user, method); // Generate a 6-digit OTP

    if (user.email === emailOrPhone) {
      await sendOTPEmail(user.email, otp);
    } else if (user.phone === emailOrPhone) {
      await sendOTPPhone(user.phone, otp);
    }

    return { otp };
  }

  async validateOTP(
    emailOrPhone: string,
    otp: string,
    device: IDevice,
    method: OTPMethodEnum
  ): Promise<{
    user: IUser;
    accessToken: string;
    refreshToken: string;
  }> {
    const key = `${emailOrPhone}-${device.device_id}`;
    if (usedOTPs.has(key)) {
      throw new BadRequestError("Invalid OTP");
    }

    const user = await this.repository.getByEmailOrPhone(emailOrPhone);

    if (!user) {
      throw new NotFoundError();
    }

    // Assuming you have a method to verify the OTP
    const isValidOTP = await this.verifyOTP(user, otp, method);

    if (!isValidOTP) {
      throw new BadRequestError("Invalid OTP");
    }

    const { accessToken, refreshToken } = await generateTokens(user.id, device);
    usedOTPs.set(key, otp);

    setTimeout(() => {
      usedOTPs.delete(key);
    }, VALIDITY_MINUTES * 60 * 1000);

    return { user, accessToken, refreshToken };
  }

  async refreshToken(
    oldRefreshToken: string,
    device: IDevice
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const { accessToken, refreshToken } = await refreshAccessToken(
      oldRefreshToken,
      device
    );
    return { accessToken, refreshToken };
  }

  private async verifyOTP(
    user: IUser,
    otp: string,
    method: OTPMethodEnum
  ): Promise<boolean> {
    if (!user.secret) {
      throw new Error("User secret not found");
    }
    if (method === OTPMethodEnum.OTP_MESSAGE) {
      const entry = otpStore.get(user.id);
      if (!entry || entry.expiresAt < Date.now()) {
        throw new BadRequestError("Invalid or expired OTP");
      }
      return hotp.verify({
        token: otp,
        secret: user.secret,
        counter: user.hotp_count || 0,
      }); // TOTP verification
    } else if (method === OTPMethodEnum.AUTHENTICATOR_APP) {
      return authenticator.verify({ token: otp, secret: user.secret }); // TOTP verification
    }
    return false;
  }

  async authenticate(token: string): Promise<IUser> {
    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as IAccessTokenPayload;
      const user = await this.repository.getById(decoded.user_id);
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (error) {
      throw new Error("Invalid token");
    }
  }

  private generateOtp = async (
    user: IUser,
    method: OTPMethodEnum
  ): Promise<string> => {
    if (!user.secret) {
      throw new Error("User secret not found");
    }
    if (method === OTPMethodEnum.OTP_MESSAGE) {
      const updatedCount = user.hotp_count + 1;
      await this.repository.update(user.id, {
        hotp_count: updatedCount,
      });

      console.log("Updated count", updatedCount);

      const expiresAt = Date.now() + VALIDITY_MINUTES * 60 * 1000; // Set expiration time
      const otp = hotp.generate(user.secret, updatedCount); // Generate a 6-digit OTP
      otpStore.set(user.id, { otp, expiresAt });

      setTimeout(() => {
        otpStore.delete(user.id);
      }, VALIDITY_MINUTES * 60 * 1000);

      return otp;
    } else if (method === OTPMethodEnum.AUTHENTICATOR_APP) {
      return authenticator.generate(user.secret); // TOTP generation
    }
    throw new BadRequestError("Invalid OTP method");
  };

  async create(item: IUser): Promise<IUser> {
    const user = await this.repository.create({
      ...item,
      secret: authenticator.generateSecret(), // Generates a base32-encoded secret key
    });
    return user;
  }

  async getAll(): Promise<IUser[]> {
    const users = await this.repository.getAll();
    return users;
  }

  async getById(id: string): Promise<IUser> {
    const user = await this.repository.getById(id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }

  async update(id: string, item: Partial<IUser>): Promise<void> {
    await this.repository.update(id, item);
    return;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
    return;
  }
}

export const userService = Object.freeze(new UserService(userRepository));
