import { db } from '../config/db-setup';
import { hashPassword, comparePassword } from '../utils/hashing';
import { IUserRegister } from '../types/user';
import {
  UserNotFoundException,
  UserAlreadyExistException,
  IncorrectPasswordException,
} from '../exceptions';
import logger from '../utils/logger';
import { generateAccessAndRefreshToken } from '../utils/jwt';
import { Response } from 'express';

export class AuthService {
  async register(data: IUserRegister) {
    const existingUser = await db.user.findUnique({
      where: { email: data.email },
      select: {
        id: true,
        email: true,
        fullname: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (existingUser) {
      throw new UserAlreadyExistException(
        'User with this email already exists'
      );
    }

    const hashedPassword = await hashPassword(data.password);

    const user = await db.user.create({
      data: {
        email: data.email,
        fullname: data.fullname,
        password: hashedPassword,
      },
    });

    return user;
  }

  async login(email: string, password: string, res: Response) {
    try {
      const user = await db.user.findUnique({
        where: { email },
      });

      if (!user) {
        throw new UserNotFoundException(
          'User with the provided credentials not found'
        );
      }

      const validPassword = await comparePassword(password, user.password);
      if (!validPassword) {
        throw new IncorrectPasswordException('Provided password is incorrect');
      }

      const { token, refreshToken } = generateAccessAndRefreshToken(user, res);

      return { user, token, refreshToken };
    } catch (error) {
      logger.error('Error logging in:', error);
      throw error;
    }
  }

  async refreshToken(userId: string, res: Response) {
    try {
      const user = await db.user.findUnique({ where: { id: userId } });

      if (!user) {
        throw new UserNotFoundException(
          'User with that credentials does not exist'
        );
      }

      generateAccessAndRefreshToken(user, res);
      return user;
    } catch (error) {
      logger.error('Error refreshing token:', error);
      throw error;
    }
  }
}
