import { Router, Request, Response } from "express";
import { UserService } from "./userService";
import { UserRequestDto } from "./dtos/userRequest.dto";

const userRouter = Router();
const userService = new UserService();


<<<<<<< HEAD

=======
// //일반 회원가입 (추후 삭제 필요)
// router.post("/", async (req: Request, res: Response) => {
//   try {
//     const userRequestDto = req.body as UserRequestDto; // 요청 본문을 UserRequestDto로 변환
//     const newUser = await userService.createUser(userRequestDto);
//     res.status(201).json(newUser); // 201 Created 상태 코드와 함께 응답
//   } catch (error) {
//     res.status(500).json({ message: "Internal Server Error" }); // 에러 발생 시 500 상태 코드와 함께 응답
//   }
// });



>>>>>>> 5c2174347355e87eab018b969e44cd925a77a734
export default Router;
