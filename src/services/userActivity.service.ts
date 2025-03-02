import { InternalServerError } from "../errors/InternalServerError";
import { IBaseRepository } from "../repositories/IRepository";
import { userActivityRepository } from "../repositories/mongodb/userActivity.mongo.repository";
import { IUserActivity } from "../types/types";

class UserActivityService {
  private repository: IBaseRepository<number>;

  constructor(repository: typeof userActivityRepository) {
    this.repository = repository;
  }

  async getAll(): Promise<IUserActivity[]> {
    try {
      const activities = await this.repository.getAll();
      return activities;
    } catch (error) {
      throw new InternalServerError();
    }
  }

  async getById(id: number): Promise<IUserActivity> {
    try {
      const activity = await this.repository.getById(id);
      if (!activity) {
        throw new Error("Activity not found");
      }
      return activity;
    } catch (error) {
      throw new InternalServerError();
    }
  }

  async create(item: IUserActivity): Promise<IUserActivity> {
    try {
      const activity = await this.repository.create(item);
      return activity;
    } catch (error) {
      throw new InternalServerError();
    }
  }

  async update(id: number, item: Partial<IUserActivity>): Promise<void> {
    try {
      await this.repository.update(id, item);
      return;
    } catch (error) {
      throw new InternalServerError();
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await this.repository.delete(id);
      return;
    } catch (error) {
      throw new InternalServerError();
    }
  }
}

export const userActivityService = Object.freeze(
  new UserActivityService(userActivityRepository)
);
