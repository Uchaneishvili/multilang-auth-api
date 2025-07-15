/**
 * Custom error class for representing an incorrect password error.
 * Inherits from the built-in Error class.
 */
export class IncorrectPasswordException extends Error {
  statusCode: number;

  constructor(message: string, statusCode = 401) {
    super(message);
    this.name = "IncorrectPassword";
    this.statusCode = statusCode;
  }
}

export default IncorrectPasswordException;
