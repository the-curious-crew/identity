import { UserModel } from "../../models/mongodb/user.mongo.model";
import { IUser } from "../../types/types";
import { IBaseRepository } from "../IRepository";

class UserRepository implements IBaseRepository<string> {
  private model = UserModel;

  async getAll(): Promise<IUser[]> {
    const data = await this.model.find();
    return data.map((item) => item.toObject());
  }

  async getByEmailOrPhone(emailOrPhone: string): Promise<IUser | null> {
    const data = await this.model.findOne({ $or: [{ email: emailOrPhone }, { phone: emailOrPhone }] });
    return data ? data.toObject() : null;
  }
    
  async getById(id: string): Promise<IUser | null> {
    const data = await this.model.findById(id);
    return data ? data.toObject() : null;
  }

  async create(data: IUser): Promise<IUser> {
    const createdData = new this.model(data);
    await createdData.save();
    return createdData.toObject();
  }

  async update(id: string, data: Partial<IUser>): Promise<void> {
    await this.model.findByIdAndUpdate(id, data);
  }

  async delete(id: string): Promise<void> {
    await this.model.findByIdAndDelete(id);
  }
}

export const userRepository = Object.freeze(new UserRepository());
