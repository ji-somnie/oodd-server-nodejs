<<<<<<< HEAD
import { Router, Request, Response } from "express";
import { UserService } from "./userService";
import { UserRequestDto } from "./dtos/userRequest.dto";
=======
import {Router, Request, Response} from 'express';
import {UserService} from './userService';
>>>>>>> aeec05f55a7fbe3c0f5019b2dd68ad73b090d6d2

const userRouter = Router();
const userService = new UserService();

<<<<<<< HEAD

//일반 회원가입 (추후 삭제 필요)
router.post("/", async (req: Request, res: Response) => {
  try {
    const userRequestDto = req.body as UserRequestDto; // 요청 본문을 UserRequestDto로 변환
    const newUser = await userService.createUser(userRequestDto);
    res.status(201).json(newUser); // 201 Created 상태 코드와 함께 응답
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" }); // 에러 발생 시 500 상태 코드와 함께 응답
  }
});

//카카오 로그인
router.post("/login/kakao", async (req: Request, res: Response) => {
 
});

//네이버 로그인
router.post("/login/naver", async (req: Request, res: Response) => {
  
});

//구글 로그인
router.post("/login/google", async (req: Request, res: Response) => {
  
});

export default router;
=======
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
>>>>>>> aeec05f55a7fbe3c0f5019b2dd68ad73b090d6d2
