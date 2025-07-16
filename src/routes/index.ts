import { Express } from 'express';
import authRoutes from './auth.routes';

export const setupRoutes = (app: Express) => {
  app.use('/api/v1/auth', authRoutes);
};
