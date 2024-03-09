import httpStatus from "http-status";
import { AppError } from "../../error/error";
import { User } from "../interface/user.interface";
import UserModel from "../schema/user.schema";
import bcrypt from "bcrypt";
class UserService {
  static createUserService = async (data: User): Promise<User | null> => {
    const user = await UserModel.create(data);
    console.log({ user });
    if (!user) {
      throw new Error("Failed to create user");
    }
    return user;
  };

  static loginUserService = async (
    email: string,
    password: string
  ): Promise<User | null> => {
    // Find the user by email
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "User not found with the email"
      ); // user not found
    }
    // Compare the provided password with the hashed password stored in the database
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new AppError(httpStatus.UNAUTHORIZED, "Password not match"); // Passwords do not match
    }
    return user; // Return the user if login successful
  };
}

export { UserService };
