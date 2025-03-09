import { InternalServerError } from "../errors/InternalServerError";
import { IBaseRepository } from "../repositories/IRepository";
import { refreshTokenRepository } from "../repositories/sql/refreshToken.sql.repository";
import { IRefreshToken } from "../types/types";

class RefreshTokenService {
  private repository: typeof refreshTokenRepository;

  constructor(repository: typeof refreshTokenRepository) {
    this.repository = repository;
  }

  async getAll(): Promise<IRefreshToken[]> {
    const tokens = await this.repository.getAll();
    return tokens;
  }

  async getById(id: string): Promise<IRefreshToken> {
    const token = await this.repository.getById(id);
    if (!token) {
      throw new Error("Token not found");
    }
    return token;
  }

  async create(item: IRefreshToken): Promise<IRefreshToken> {
    const token = await this.repository.create(item);
    return token;
  }

  async update(id: string, item: Partial<IRefreshToken>): Promise<void> {
    await this.repository.update(id, item);
    return;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
    return;
  }
}

export const refreshTokenService = Object.freeze(
  new RefreshTokenService(refreshTokenRepository)
);
