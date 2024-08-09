import { Router } from 'express';
import { UserController } from './userController';

const router = Router();

router.get('/:id', UserController.getUserById);
router.post('/', UserController.createUser);

export default router;
