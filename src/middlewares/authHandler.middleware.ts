import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { InvalidTokenException } from '../exceptions/InvalidTokenException';
import { IUserRegister } from '../types/user';
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
    return next(new InvalidTokenException('Access token is invalid.'));

  jwt.verify(
    token,
    process.env.JWT_SECRET as string,
    (err: jwt.VerifyErrors | null, decoded: unknown) => {
      if (err)
        return next(new InvalidTokenException('Access token is invalid.'));

      req.user = decoded as IUserRegister;
      next();
    }
  );
};
