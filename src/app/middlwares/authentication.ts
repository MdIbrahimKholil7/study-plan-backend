import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { Secret } from "jsonwebtoken";
import { AppError } from "../../error/error";
import { jwtHelpers } from "../helpers/jwt.helper";
import config from "../../config/config";

const ensureAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //get authorization token
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
      // console.log(token);
    }
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized");
    }
    // verify token
    let verifiedUser = null;

    verifiedUser = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);
    req.user = verifiedUser; // role  , userid
    next();
  } catch (error) {
    next(error);
  }
};

export default ensureAuthenticated;
