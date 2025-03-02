import { UserActivityModel } from "../../models/mongodb/userActivity.mongo.model";
import { IUserActivity } from "../../types/types";
import { IBaseRepository } from "../IRepository";

class UserActivityRepository implements IBaseRepository<number> {
  private model = UserActivityModel;

  async getAll(): Promise<IUserActivity[]> {
    const data = await this.model.find();
    return data.map((item) => item.toObject());
  }

  async getById(id: number): Promise<IUserActivity | null> {
    const data = await this.model.findOne({ id });
    return data ? data.toObject() : null;
  }

  async create(data: IUserActivity): Promise<IUserActivity> {
    const createdData = new this.model(data);
    await createdData.save();
    return createdData.toObject();
  }

  async update(id: number, data: Partial<IUserActivity>): Promise<void> {
    await this.model.updateOne({ id }, data);
  }

  async delete(id: number): Promise<void> {
    await this.model.deleteOne({ id });
  }
}

export const userActivityRepository = Object.freeze(new UserActivityRepository());
