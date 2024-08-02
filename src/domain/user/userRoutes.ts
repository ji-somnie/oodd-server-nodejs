import { Router } from 'express';
import { getUserById } from './userController'; // named export 사용

const router = Router();

// 사용자 정보를 조회하는 엔드포인트
router.get('/:id', getUserById); // named export 사용

export default router;
