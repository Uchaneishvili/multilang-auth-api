/**
 * Custom error class for representing an invalid access token error.
 * Inherits from the built-in Error class.
 */
export class InvalidTokenException extends Error {
  statusCode: number;

  constructor(message: string, statusCode = 401) {
    super(message);
    this.name = 'AccessTokenInvalid';
    this.statusCode = statusCode;
  }
}

export default InvalidTokenException;
