import { InternalServerError } from "../errors/InternalServerError";
import { IBaseRepository } from "../repositories/IRepository";
import { refreshTokenRepository } from "../repositories/mongodb/refreshToken.mongo.repository";
import { IRefreshToken } from "../types/types";

class RefreshTokenService {
  private repository: typeof refreshTokenRepository;

  constructor(repository: typeof refreshTokenRepository) {
    this.repository = repository;
  }

  async getAll(): Promise<IRefreshToken[]> {
    try {
      const tokens = await this.repository.getAll();
      return tokens;
    } catch (error) {
      throw new InternalServerError();
    }
  }

  async getById(id: string): Promise<IRefreshToken> {
    try {
      const token = await this.repository.getById(id);
      if (!token) {
        throw new Error("Token not found");
      }
      return token;
    } catch (error) {
      throw new InternalServerError();
    }
  }

  async create(item: IRefreshToken): Promise<IRefreshToken> {
    try {
      const token = await this.repository.create(item);
      return token;
    } catch (error) {
      throw new InternalServerError();
    }
  }

  async update(id: string, item: Partial<IRefreshToken>): Promise<void> {
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

export const refreshTokenService = Object.freeze(
  new RefreshTokenService(refreshTokenRepository)
);
