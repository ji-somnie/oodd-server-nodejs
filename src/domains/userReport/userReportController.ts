import {Router, Request, Response} from 'express';
import {User} from '../../entities/userEntity';
import {UserReportService} from './userReportSerice';
import {BaseResponse} from '../../base/baseResponse';
import {ALREADY_REQUESTED, HTTP_OK, NO_AUTHORIZATION, NO_BODY_DATA, NOT_FOUND_USER} from '../../variables/httpCode';
import {UserService} from '../user/userService';
import {UserReport} from '../../entities/userReportEntity';

const userReportRouter = Router();
const userReportService = new UserReportService();
const userService = new UserService();

// 매칭 신청 리스트 조회
userReportRouter.patch('/', async (req: Request, res: Response): Promise<void> => {
  const user = req.user as User;
  const toUserId = req.body.toUserId;
  const fromUserId = req.body.fromUserId;
  const reason = req.body.reason;

  if (!toUserId || !fromUserId || !reason) {
    res.status(400).json(new BaseResponse(false, NO_BODY_DATA.code, NO_BODY_DATA.message));
    return;
  }

  if (user.id !== fromUserId) {
    res.status(401).json(new BaseResponse(false, NO_AUTHORIZATION.code, NO_AUTHORIZATION.message));
    return;
  }
  const toUser = await userService.getUserByUserId(toUserId);
  if (!toUser) {
    res.status(404).json(new BaseResponse(false, NOT_FOUND_USER.code, NOT_FOUND_USER.message));
    return;
  }

  if (await userReportService.getUserReportByFromAndToUser(user, toUser)) {
    res.status(400).json(new BaseResponse(false, ALREADY_REQUESTED.code, ALREADY_REQUESTED.message));
    return;
  }

  const userReport = await userReportService.postUserReport(user, toUser, reason);

  res.status(200).json(new BaseResponse<UserReport>(true, HTTP_OK.code, HTTP_OK.message, userReport as UserReport));
  return;
});

export default userReportRouter;
