/**
 * Express router for handling user authentication.
 */

import express, { Router } from 'express';
import {
  registerUser,
  loginUser,
  refreshAccessToken,
} from '../controllers/auth.controller';
import { Validator, authHandler } from '../middlewares';
import { createUserValidator, userSignInValidator } from '../validations';

const router: Router = express.Router();

router.post('/register', Validator(createUserValidator), registerUser);

router.post('/login', Validator(userSignInValidator), loginUser);

router.post('/refresh/token', authHandler, refreshAccessToken);

export default router;
