import express from 'express';
import * as userController from '../controllers/user.controller';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.post('/register', userController.createUser);
router.post('/login', userController.loginUser);

export default router;
