import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// middleware to authenticate using jwt
const jwtAuthMiddleware = (req: any, res: Response, next: NextFunction) => {
  console.log("token");

  const token =
    req.headers["authorization"] && req.headers["authorization"].split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access token is missing or invalid." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
    //console.log(decoded, "deeeee");

    req.user = decoded;

    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Access token is invalid or expired." });
  }
};

export default jwtAuthMiddleware;
