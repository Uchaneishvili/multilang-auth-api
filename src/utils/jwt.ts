import jwt from 'jsonwebtoken';
import { User } from '../types/user';
import { Response } from 'express';

/**
 * Generates a JWT for a given user.
 */
const generateJwt = (
  user: User,
  secret: string,
  expiresIn: string | number = '24d'
): string => {
  const token = jwt.sign(
    {
      userId: user.id,
      email: user.email,
      fullname: user.fullname,
    },
    secret,
    {
      expiresIn,
    } as jwt.SignOptions
  );
  return token;
};

/**
 * Generates access and refresh tokens for a user and sets them as cookies in the response.
 */
const generateAccessAndRefreshToken = (user: User, res: Response) => {
  const jwtSecret = process.env.JWT_SECRET_KEY;
  const jwtRefreshSecret = process.env.JWT_SECRET_KEY_REFRESH;

  if (!jwtSecret || !jwtRefreshSecret) {
    throw new Error('JWT secrets are not configured in environment variables');
  }

  const token = generateJwt(user, jwtSecret, '12d');
  const refreshToken = generateJwt(user, jwtRefreshSecret, '24d');

  res.cookie('token', token, {
    maxAge: 24 * 24 * 60 * 60 * 1000, // 24 days
    httpOnly: true,
  });
  res.cookie('token.refresh', refreshToken, {
    maxAge: 24 * 24 * 60 * 60 * 1000, // 24 days
    httpOnly: true,
  });

  return {
    token,
    refreshToken,
  };
};

module.exports = { generateAccessAndRefreshToken };
