import express from 'express';
import * as userController from '../controllers/user.controller';
import dotenv from 'dotenv';
import { validate } from '../middleware/zod.middleware';
import { loginUserSchema, registerUserSchema } from '../types/user.types';

dotenv.config();

const router = express.Router();

router.post(
	'/register',
	validate(registerUserSchema),
	userController.createUser
);
router.post('/login', validate(loginUserSchema), userController.loginUser);

export default router;
