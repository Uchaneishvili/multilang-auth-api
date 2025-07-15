/**
 * Custom error class for representing a user already exists error.
 * Inherits from the built-in Error class.
 */
export class UserAlreadyExistException extends Error {
  statusCode: number;

  constructor(message: string, statusCode = 403) {
    super(message);
    this.name = "UserAlreadyExist";
    this.statusCode = statusCode;
  }
}

export default UserAlreadyExistException;
