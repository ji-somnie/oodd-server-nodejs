import { Router } from 'express';
import { reportPost, getReportReasons } from './reportController';

const router = Router();

// 게시물을 신고하는 엔드포인트
router.post('/report', reportPost);

// 신고 사유 목록을 가져오는 엔드포인트
router.get('/report/reasons', getReportReasons);

export default router;
