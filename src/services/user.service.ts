import { InternalServerError } from "../errors/InternalServerError";
import { userRepository } from "../repositories/mongodb/user.mongo.repository";
import { IUser, RefreshTokenStatusEnum } from "../types/types";
import { sendOTPEmail, sendOTPPhone } from "../lib/otp";
import { authenticator } from "otplib";
import * as jwt from "jsonwebtoken";
import { NotFoundError } from "../errors/NotFoundError";
import { BadRequestError } from "../errors/BadRequestError";

class UserService {
  private repository: typeof userRepository;

  constructor(repository: typeof userRepository) {
    this.repository = repository;
  }

  async sendOTP(emailOrPhone: string): Promise<void> {
    try {
      const user = await this.repository.getByEmailOrPhone(emailOrPhone);

      if (!user) {
        throw new Error("User not found");
      }

      const otp = this.generateOtp(user); // Generate a 6-digit OTP

      if (user.email === emailOrPhone) {
        await sendOTPEmail(user.email, otp);
      } else if (user.phone === emailOrPhone) {
        await sendOTPPhone(user.phone, otp);
      }
    } catch (error) {
      throw new InternalServerError();
    }
  }

  async authenticate(emailOrPhone: string, otp: string): Promise<any> {
    try {
      const user = await this.repository.getByEmailOrPhone(emailOrPhone);

      if (!user) {
        throw new NotFoundError();
      }

      // Assuming you have a method to verify the OTP
      const isValidOTP = await this.verifyOTP(user, otp);

      if (!isValidOTP) {
        throw new BadRequestError("Invalid OTP");
      }

      const accessToken = jwt.sign(
        { id: user.id },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "1d",
        }
      );

      const refreshToken = jwt.sign(
        { id: user.id },
        process.env.REFRESH_TOKEN_SECRET,
        {
          expiresIn: "30d",
        }
      );

      return { user, accessToken, refreshToken };
    } catch (error) {
      throw new InternalServerError();
    }
  }

  private async verifyOTP(user: IUser, otp: string): Promise<boolean> {
    if (!user.secret) {
      throw new Error("User secret not found");
    }
    return authenticator.verify({ token: otp, secret: user.secret }); // TOTP verification
  }

  private generateOtp = (user: IUser): string => {
    if (!user.secret) {
      throw new Error("User secret not found");
    }
    return authenticator.generate(user.secret); // TOTP generation
  };

  async create(item: IUser): Promise<IUser> {
    try {
      const user = await this.repository.create({
        ...item,
        secret: authenticator.generateSecret(), // Generates a base32-encoded secret key
      });
      return user;
    } catch (error) {
      throw new InternalServerError();
    }
  }

  async getAll(): Promise<IUser[]> {
    try {
      const users = await this.repository.getAll();
      return users;
    } catch (error) {
      throw new InternalServerError();
    }
  }

  async getById(id: string): Promise<IUser> {
    try {
      const user = await this.repository.getById(id);
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (error) {
      throw new InternalServerError();
    }
  }

  async update(id: string, item: Partial<IUser>): Promise<void> {
    try {
      await this.repository.update(id, item);
      return;
    } catch (error) {
      throw new InternalServerError();
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.repository.delete(id);
      return;
    } catch (error) {
      throw new InternalServerError();
    }
  }
}

export const userService = Object.freeze(new UserService(userRepository));
