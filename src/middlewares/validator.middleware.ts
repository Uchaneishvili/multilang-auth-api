import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

/**
 * Checks if an object is empty.
 */
function isEmpty(obj: Record<string, unknown>): boolean {
  return Object.keys(obj).length === 0;
}

/**
 * Middleware for validating request data using a Joi schema.
 */
export default function Validator(validator: Joi.ObjectSchema) {
  //! If validator does not exist, throw error
  if (!validator) throw new Error(`validator does not exist`);

  return async function (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { body, query, params } = req;
      const target: { body?: unknown; query?: unknown; params?: unknown } = {};
      if (!isEmpty(body)) target.body = body;
      if (!isEmpty(query)) target.query = query;
      if (!isEmpty(params)) target.params = params;

      const validated = await validator.validateAsync(target, {
        abortEarly: false,
      });

      req.body = validated.body || {};
      req.query = validated.query || {};
      req.params = validated.params || {};
      next();
    } catch (err) {
      return next(err);
    }
  };
}
