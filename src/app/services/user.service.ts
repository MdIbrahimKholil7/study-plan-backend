import { Request, Response } from "express";
import { logger } from "../../shared/logger";
import { User } from "../interface/user.interface";
import UserModel from "../schema/user.schema";

class UserService {
  static createUserService = async (data: User): Promise<User | null> => {
    const user = await UserModel.create(data);
    if (!user) {
      throw new Error("Failed to create user");
    }
    return user;
  };
}

export { UserService };
