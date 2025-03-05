import { RefreshTokenModel } from "../../models/mongodb/refreshToken.mongo.model";
import { IRefreshToken } from "../../types/types";
import { IBaseRepository } from "../IRepository";

class RefreshTokenRepository implements IBaseRepository<string> {
  private model = RefreshTokenModel;

  async getAll(): Promise<IRefreshToken[]> {
    const data = await this.model.find();
    return data.map((item) => item.toObject());
  }

  async getById(id: string): Promise<IRefreshToken | null> {
    const data = await this.model.findById(id);
    return data ? data.toObject() : null;
  }

  async create(data: IRefreshToken): Promise<IRefreshToken> {
    const createdData = new this.model(data);
    await createdData.save();
    return createdData.toObject();
  }

  async update(id: string, data: Partial<IRefreshToken>): Promise<void> {
    await this.model.findByIdAndUpdate(id, data);
  }

  async delete(id: string): Promise<void> {
    await this.model.findByIdAndDelete(id);
  }
}

export const refreshTokenRepository = Object.freeze(new RefreshTokenRepository());