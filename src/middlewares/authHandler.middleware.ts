import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "../types/express";

const { InvalidToken } = require("../exceptions");

/**
 * Middleware to handle JWT authentication.
 */
export const authHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;

  if (!token) return next(new InvalidToken("Access token is invalid."));

  jwt.verify(
    token,
    process.env.JWT_SECRET_KEY as string,
    (err: jwt.VerifyErrors | null, user: any) => {
      if (err) return next(new InvalidToken("Access token is invalid."));

      req.user = user;
      next();
    }
  );
};
