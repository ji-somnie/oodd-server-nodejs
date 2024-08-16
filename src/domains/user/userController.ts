import { Router, Request, Response } from "express";
import { UserService } from "./userService";
import { UserRequestDto } from "./dtos/userRequest.dto";
import { HTTP_INTERNAL_SERVER_ERROR, NOT_FOUND_USER, status } from '../../variables/httpCode';

// import coolsms from 'coolsms-node-sdk';
import dotenv from 'dotenv';
import { authenticateJWT } from "../../middlewares/authMiddleware";
import { UserResponseDto } from "./dtos/userResponse.dto";
dotenv.config();

const userRouter = Router();
const userService = new UserService();


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


// 휴대폰번호 본인인증 코드 전송
userRouter.post("/phone/verification", authenticateJWT, async (req: Request, res: Response) => {
  const { phone } = req.body;

  if (!phone) {
    return res.status(status.PHONE_NUMBER_REQUIRED.status).json({ message: status.PHONE_NUMBER_REQUIRED.message, err_code: status.PHONE_NUMBER_REQUIRED.err_code });
  }

  try {
    await userService.sendVerificationCode(phone);
    return res.status(status.VERIFICATION_SEND_SUCCESS.status).json({ message: status.VERIFICATION_SEND_SUCCESS.message, err_code: status.VERIFICATION_SEND_SUCCESS.err_code });
  } catch (error) {
    return res.status(status.VERIFICATION_SEND_FAILED.status).json({ message: status.VERIFICATION_SEND_FAILED.message, err_code: status.VERIFICATION_SEND_FAILED.err_code });
  }
});

//휴대폰번호 본인인증 코드 확인
userRouter.post("/phone/verification/check", authenticateJWT, async (req: Request, res: Response) => {
  const { phone, token } = req.body;

  if (!phone || !token) {
    return res.status(status.VERIFICATION_CODE_NEEDED.status).json({ message: status.VERIFICATION_CODE_NEEDED.message, err_code: status.VERIFICATION_CODE_NEEDED.err_code });
  }

  try {
    const isValid = await userService.verifyCode(phone, token);
    if (isValid) {
      return res.status(status.VERIFY_SUCCESS.status).json({ message: status.VERIFY_SUCCESS.message, err_code: status.VERIFY_SUCCESS.err_code });
    } else {
      return res.status(status.VERIFY_FAILED.status).json({ message: status.VERIFY_FAILED.message, err_code: status.VERIFY_FAILED.err_code });
    }
  } catch (error) {
    return res.status(status.VERIFY_FAILED.status).json({ message: status.VERIFY_FAILED.message, err_code: status.VERIFY_FAILED.err_code });
  }
});
 
// 사용자 정보 조회
userRouter.get("/:userId", authenticateJWT, async (req: Request, res: Response) => {
  try {
      const userId = parseInt(req.params.userId, 10);  // Number 대신 parseInt 사용
      if (isNaN(userId)) {
          return res.status(400).json({ message: NOT_FOUND_USER.message});
      }

      const user = await userService.getUserByUserId(userId);
      if (!user) {
          return res.status(404).json({ message: NOT_FOUND_USER.message });
      }

      const userResponse = new UserResponseDto();
      userResponse.id = user.id;
      userResponse.name = user.name;
      userResponse.email = user.email;
      userResponse.nickname = user.nickname;
      userResponse.phoneNumber = user.phoneNumber;
      userResponse.profilePictureUrl = user.profilePictureUrl;
      userResponse.bio = user.bio;
      userResponse.joinedAt = user.joinedAt;

      return res.status(200).json(userResponse);
  } catch (error) {
    res.status(500).json({ message: HTTP_INTERNAL_SERVER_ERROR.message });
  }
});


export default userRouter;
