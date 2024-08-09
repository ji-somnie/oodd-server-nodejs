// src/domain/user/userRoutes.ts
import { Router } from 'express';
import { UserController } from './userController';

const router = Router();
const userController = new UserController();

router.get('/:id', (req, res) => userController.getUserById(req, res));

export default router;
