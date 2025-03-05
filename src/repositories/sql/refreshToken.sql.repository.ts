import { RefreshTokenModel } from "../../models/sql/refreshToken.sql.model";
import { IRefreshToken } from "../../types/types";
import { IBaseRepository } from "../IRepository";

class RefreshTokenRepository implements IBaseRepository<string> {
  private model = RefreshTokenModel;

  async getAll(): Promise<IRefreshToken[]> {
    const data = await this.model.findAll();
    return data.map((item) => item.toJSON());
  }

  async getById(id: string): Promise<IRefreshToken | null> {
    const data = await this.model.findByPk(id);
    return data ? data.toJSON() : null;
  }

  async create(data: IRefreshToken): Promise<IRefreshToken> {
    const createdData = await this.model.create(data);
    return createdData.toJSON();
  }

  async update(id: string, data: Partial<IRefreshToken>): Promise<void> {
    await this.model.update(data, { where: { id } });
  }

  async delete(id: string): Promise<void> {
    await this.model.destroy({ where: { id } });
  }
}

export const refreshTokenRepository = Object.freeze(new RefreshTokenRepository());