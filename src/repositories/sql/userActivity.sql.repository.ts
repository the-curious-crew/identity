import { UserActivityModel } from "../../models/sql/userActivity.sql.model";
import { WhereOptions } from "sequelize";
import { IUserActivity } from "../../types/types";
import { IBaseRepository } from "../IRepository";

class UserActivityRepository implements IBaseRepository<number> {
  private model = UserActivityModel;

  async getAll(): Promise<IUserActivity[]> {
    const data = await this.model.findAll();
    return data.map((item) => item.toJSON());
  }

  async getById(id: number): Promise<IUserActivity | null> {
    const data = await this.model.findByPk(id);
    return data ? data.toJSON() : null;
  }

  async create(data: IUserActivity): Promise<IUserActivity> {
    const createdData = await this.model.create(data);
    return createdData.toJSON();
  }

  async update(id: number, data: Partial<IUserActivity>): Promise<void> {
    await this.model.update(data, { where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.model.destroy({ where: { id } });
  }
}

export const userActivityRepository = Object.freeze(new UserActivityRepository());
