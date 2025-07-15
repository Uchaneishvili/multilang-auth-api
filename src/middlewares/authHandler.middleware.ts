import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { InvalidTokenException } from "../exceptions/InvalidTokenException";
import "../types/express";

/**
 * Middleware to handle JWT authentication.
 */
export const authHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;

  if (!token)
    return next(new InvalidTokenException("Access token is invalid."));

  jwt.verify(
    token,
    process.env.JWT_SECRET_KEY as string,
    (err: jwt.VerifyErrors | null, user: any) => {
      if (err)
        return next(new InvalidTokenException("Access token is invalid."));

      req.user = user;
      next();
    }
  );
};
