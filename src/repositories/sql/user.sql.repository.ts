import { UserModel } from "../../models/sql/user.sql.model";
import { Op, WhereOptions } from "sequelize";
import { IUser } from "../../types/types";
import { IBaseRepository } from "../IRepository";

class UserRepository implements IBaseRepository<string> {
  private model = UserModel;

  async getAll(): Promise<IUser[]> {
    const data = await this.model.findAll();
    return data.map((item) => item.toJSON());
  }

  async getByEmailOrPhone(emailOrPhone: string): Promise<IUser | null> {
    const data = await this.model.findOne({
      where: { [Op.or]: [{ email: emailOrPhone }, { phone: emailOrPhone }] },
    });
    return data ? data.toJSON() : null;
  }

  async getById(id: string): Promise<IUser | null> {
    const data = await this.model.findByPk(id);
    return data ? data.toJSON() : null;
  }

  async create(data: Omit<IUser, "id">): Promise<IUser> {
    const createdData = await this.model.create(data);
    return createdData.toJSON();
  }

  async update(id: string, data: Partial<IUser>): Promise<void> {
    await this.model.update(data, { where: { id } });
  }

  async delete(id: string): Promise<void> {
    await this.model.destroy({ where: { id } });
  }
}

export const userRepository = Object.freeze(new UserRepository());
