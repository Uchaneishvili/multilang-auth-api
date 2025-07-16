import { Request, Response, NextFunction } from 'express';
import { resultCodes } from '../enums';
import { AuthService } from '../services/auth.services';

const authService = new AuthService();

/**
 * Registers a new user.
 */
export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { fullname, email, password } = req.body;
    const user = await authService.register({
      fullname,
      email,
      password,
    });

    return res.status(201).json({ user, result: resultCodes.SUCCESS });
  } catch (error) {
    next(error);
  }
};

/**
 * Logs in a user.
 */
export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { email, password } = req.body;
    const { user, token, refreshToken } = await authService.login(
      email,
      password,
      res
    );

    return res
      .status(200)
      .json({ user, token, refreshToken, result: resultCodes.SUCCESS });
  } catch (error) {
    next(error);
  }
};

/**
 * Refreshes user token.
 */
export const refreshAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    await authService.refreshToken(req.user.userId, res);

    return res.status(200).json({ result: resultCodes.SUCCESS });
  } catch (error) {
    next(error);
  }
};
