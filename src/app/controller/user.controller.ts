import { Request, Response } from "express";
import { logger } from "../../shared/logger";
import { UserService } from "../services/user.service";
import catchAsync from "../../shared/catchAsync";
import { UserResponse } from "../interface/user.interface";
import httpStatus from "http-status";
import sendResponse from "../../shared/response";

class UserController {
  static createUser = catchAsync(async (req: Request, res: Response) => {
    const userData = await UserService.createUserService(req.body);

    // Check if userData is null
    if (!userData) {
      // Handle the case where user creation failed
      return sendResponse<UserResponse>(res, {
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        success: false,
        message: "Failed to create user",
        data: null,
      });
    }
    // Destructure userData

    // Send success response
    sendResponse<UserResponse>(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "User created successfully",
      data: userData,
    });
  });
  static loginUser = catchAsync(async (req: Request, res: Response) => {
    const userData = await UserService.loginUserService(
      req.body.email,
      req.body.password
    );
    // Check if userData is null
    if (!userData) {
      // Handle the case where user creation failed
      return sendResponse<UserResponse>(res, {
        statusCode: httpStatus.UNAUTHORIZED,
        success: false,
        message: "Login failed",
        data: null,
      });
    }
    // Destructure userData
    const { password, ...data } = userData;
    // Send success response
    sendResponse<UserResponse>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Login successful",
      data: userData,
    });
  });
}

export { UserController };
