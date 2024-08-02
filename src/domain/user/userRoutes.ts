import { Router } from 'express';
import { getUserById, updateUser, getUserPosts, createUserPost, getPostById } from './userController';

const router = Router();

// 사용자 정보를 조회하는 엔드포인트
router.get('/:id', getUserById);

// 사용자 정보를 수정하는 엔드포인트
router.put('/:id', updateUser);

// 특정 사용자의 모든 게시글을 조회하는 엔드포인트
router.get('/:id/posts', getUserPosts);

// 새로운 게시글을 생성하는 엔드포인트
router.post('/:id/posts', createUserPost);

// 특정 게시글을 조회하는 엔드포인트
router.get('/posts/:postId', getPostById);

export default router;
