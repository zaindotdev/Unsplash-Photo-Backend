import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.model.js";
import jwt, { JwtPayload } from "jsonwebtoken";

export const Auth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token =
      req.cookies.access_token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      res.status(401).json({
        message: "Unauthorized",
        statusCode: 401,
      });
      return;
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN!) as JwtPayload;

    if (typeof decoded !== "object" || !("userId" in decoded)) {
      res.status(401).json({
        message: "Unauthorized",
        statusCode: 401,
      });
      return;
    }

    const user = await User.findById(decoded.userId);

    if (!user) {
      res.status(401).json({
        message: "Unauthorized",
        statusCode: 401,
      });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({
      message: "Invalid or expired token",
      statusCode: 401,
    });
  }
};

export default Auth;
