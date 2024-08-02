import { Router } from 'express';
import { requestMatch, respondMatchRequest } from './matchController';

const router = Router();

// 매칭 요청을 보내는 엔드포인트
router.post('/request', requestMatch);

// 매칭 요청을 수락/거부하는 엔드포인트
router.post('/respond', respondMatchRequest);

export default router;
