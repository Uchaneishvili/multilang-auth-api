// Extend the Express Request interface to include user and cookies properties
declare global {
  namespace Express {
    interface Request {
      user?: any;
      cookies: Record<string, string>;
    }
  }
}

export {};
