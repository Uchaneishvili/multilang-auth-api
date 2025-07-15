import bcrypt from 'bcrypt';
import logger from './logger';

/**
 * Hashes a password using bcrypt.
 */
export const hashPassword = async (password: string) => {
  const hashedPwd = await bcrypt.hash(password, 12);
  return hashedPwd;
};

/**
 * Compares a given password with a hashed password.
 */
export const comparePassword = async (password: string, userPwd: string) => {
  try {
    const isCorrect = await bcrypt.compare(password, userPwd);
    return isCorrect;
  } catch (error) {
    logger.error(error);
    return false;
  }
};
