// Extend the Express Request interface to include user and cookies properties
declare global {
  namespace Express {
    interface Request {
      user?: User;
      cookies: Record<string, string>;
    }
  }
}

export {};
