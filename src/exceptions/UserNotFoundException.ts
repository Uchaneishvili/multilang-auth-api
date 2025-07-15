/**
 * Custom error class for representing a user not found error.
 * Inherits from the built-in Error class.
 */
export class UserNotFoundException extends Error {
  statusCode: number;

  constructor(message: string, statusCode = 404) {
    super(message);
    this.name = "UserNotFound";
    this.statusCode = statusCode;
  }
}

export default UserNotFoundException;
