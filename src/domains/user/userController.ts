import {Router, Request, Response} from 'express';
import {UserService} from './userService';

const userRouter = Router();
const userService = new UserService();

userRouter.get('/', async (req: Request, res: Response) => {
  const users = await userService.getAllUsers();
  res.json(users);
});

userRouter.post('/', async (req: Request, res: Response) => {
  const {name, email} = req.body;
  const user = await userService.createUser(name, email);
  res.json(user);
});

export default userRouter;

//controller + dto + service
//entity
//repo