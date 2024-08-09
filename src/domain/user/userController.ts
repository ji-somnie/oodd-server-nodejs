import { Request, Response } from 'express';

export class UserController {
  static getUserById(req: Request, res: Response) {
    const userId = req.params.id;
    //사용자 ID로 사용자를 찾는 로직 추가
    res.send(`User ID: ${userId}`);
  }

  static createUser(req: Request, res: Response) {
    const newUser = req.body;
    //새로운 사용자 생성 로직 추가
    res.status(201).send(`User created with name: ${newUser.name}`);
  }
}
