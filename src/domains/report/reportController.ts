import {Router, Request, Response} from 'express';
import {User} from '../../entities/userEntity';
import {ReportService} from './reportSerice';
import {BaseResponse} from '../../base/baseResponse';
import {ALREADY_REQUESTED, HTTP_OK, NO_AUTHORIZATION, NO_BODY_DATA, NOT_FOUND_POST} from '../../variables/httpCode';
import {PostService} from '../post/postService';
import {Report} from '../../entities/reportEntity';

const reportRouter = Router();
const reportService = new ReportService();
const postService = new PostService();

reportRouter.patch('/', async (req: Request, res: Response): Promise<void> => {
  const user = req.user as User;
  const userdId = req.body.userId;
  const postId = req.body.postId;
  const reason = req.body.reason;

  if (!userdId || !postId || !reason) {
    res.status(400).json(new BaseResponse(false, NO_BODY_DATA.code, NO_BODY_DATA.message));
    return;
  }

  if (user.id !== userdId) {
    res.status(401).json(new BaseResponse(false, NO_AUTHORIZATION.code, NO_AUTHORIZATION.message));
    return;
  }
  const post = await postService.getPostById(postId);
  if (!post) {
    res.status(404).json(new BaseResponse(false, NOT_FOUND_POST.code, NOT_FOUND_POST.message));
    return;
  }

  if (await reportService.getReportByReporterAndPost(user, post)) {
    res.status(400).json(new BaseResponse(false, ALREADY_REQUESTED.code, ALREADY_REQUESTED.message));
    return;
  }

  const report = await reportService.postReport(user, post, reason);

  res.status(200).json(new BaseResponse<Report>(true, HTTP_OK.code, HTTP_OK.message, report as Report));
  return;
});

export default reportRouter;
