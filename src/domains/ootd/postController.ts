import { Router, Request, Response } from 'express';
import { PostService } from './postService';
import { PostRequestDto } from './dtos/postRequest.dto';
import { HTTP_OK, HTTP_BAD_REQUEST, HTTP_INTERNAL_SERVER_ERROR } from '../../variables/httpCode';

const router = Router();
const postService = new PostService();

// 토큰 검증 대신 일단 하드코딩    
const tempUserId = 1;
const userId = tempUserId;

// 게시물 업로드
router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const postRequestDto: PostRequestDto = req.body;
    const newPostResponse = await postService.createPost(userId, postRequestDto);

    if (newPostResponse.isSuccess) {
      res.status(HTTP_OK.code).json(newPostResponse);
    }
  } catch (error) {
    console.error(error); 
    if (error instanceof Error) {
      res.status(HTTP_BAD_REQUEST.code).json({ message: HTTP_BAD_REQUEST.message });
    } else {
      res.status(HTTP_INTERNAL_SERVER_ERROR.code).json({ message: HTTP_INTERNAL_SERVER_ERROR.message });
    }
  }
});

// 게시물 삭제
router.delete('/:postId', async (req: Request, res: Response): Promise<void> => {
  try {
    const postId = parseInt(req.params.postId, 10);

    const deletePostResponse = await postService.deletePost(userId, postId);

    if (deletePostResponse.isSuccess) {
      res.status(HTTP_OK.code).json(deletePostResponse);
    } 
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      res.status(HTTP_BAD_REQUEST.code).json({ message: HTTP_BAD_REQUEST.message });
    } else {
      res.status(HTTP_INTERNAL_SERVER_ERROR.code).json({ message: HTTP_INTERNAL_SERVER_ERROR.message });
    }
  }
});

export default router;
