import express from 'express';
import * as userController from '../controllers/user.controller';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.get('/:id', userController.getUserById);

export default router;
