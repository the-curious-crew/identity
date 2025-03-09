import { InternalServerError } from "../errors/InternalServerError";
import { IBaseRepository } from "../repositories/IRepository";
import { userActivityRepository } from "../repositories/sql/userActivity.sql.repository";
import { IUserActivity } from "../types/types";

class UserActivityService {
  private repository: typeof userActivityRepository;

  constructor(repository: typeof userActivityRepository) {
    this.repository = repository;
  }

  async getAll(): Promise<IUserActivity[]> {
    const activities = await this.repository.getAll();
    return activities;
  }

  async getById(id: number): Promise<IUserActivity> {
    const activity = await this.repository.getById(id);
    if (!activity) {
      throw new Error("Activity not found");
    }
    return activity;
  }

  async create(item: IUserActivity): Promise<IUserActivity> {
    const activity = await this.repository.create(item);
    return activity;
  }

  async update(id: number, item: Partial<IUserActivity>): Promise<void> {
    await this.repository.update(id, item);
    return;
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
    return;
  }
}

export const userActivityService = Object.freeze(
  new UserActivityService(userActivityRepository)
);
