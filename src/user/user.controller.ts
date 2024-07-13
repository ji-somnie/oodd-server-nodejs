import { Router, Request, Response } from 'express';
import { UserService } from './user.service';

const router = Router();
const userService = new UserService();

router.get('/', async (req: Request, res: Response) => {
  const users = await userService.getAllUsers();
  res.json(users);
});

router.post('/', async (req: Request, res: Response) => {
  const { name, email } = req.body;
  const user = await userService.createUser(name, email);
  res.json(user);
});

export default router;
