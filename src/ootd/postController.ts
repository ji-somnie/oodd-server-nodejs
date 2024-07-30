import { Router, Request, Response } from 'express';
import { PostService } from './postService';
import { PostRequestDto } from './dtos/postRequest.dto';
import { status } from '../variables/httpCode'; 

const router = Router();
const postService = new PostService();

// 게시물 업로드
router.post('/', async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(status.UNAUTHORIZED.status).json({ message: status.UNAUTHORIZED.message, err_code: status.UNAUTHORIZED.err_code });
    }
    
    const postRequestDto: PostRequestDto = req.body;
    const newPost = await postService.createPost(token, postRequestDto);
    res.status(status.SUCCESS.status).json(newPost);
  } catch (error) {
    if (error instanceof Error) {
      res.status(status.BAD_REQUEST.status).json({ message: status.BAD_REQUEST.message, err_code: status.BAD_REQUEST.err_code });
    } else {
      res.status(status.INTERNAL_SERVER_ERROR.status).json({ message: status.INTERNAL_SERVER_ERROR.message, err_code: status.INTERNAL_SERVER_ERROR.err_code });
    }
  }
});

// 게시물 수정
router.patch('/:id', async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(status.UNAUTHORIZED.status).json({ message: status.UNAUTHORIZED.message, err_code: status.UNAUTHORIZED.err_code });
    }

    const postId = parseInt(req.params.id, 10);
    if (isNaN(postId)) {
      return res.status(status.ARTICLE_NOT_FOUND.status).json({ message: status.ARTICLE_NOT_FOUND.message, err_code: status.ARTICLE_NOT_FOUND.err_code });
    }

    const postRequestDto: PostRequestDto = req.body;
    const updatedPost = await postService.updatePost(token, postId, postRequestDto);
    res.status(status.SUCCESS.status).json({ message: status.SUCCESS.message });
  } catch (error) {
    if (error instanceof Error) {
      res.status(status.BAD_REQUEST.status).json({ message: status.BAD_REQUEST.message, err_code: status.BAD_REQUEST.err_code });
    } else {
      res.status(status.INTERNAL_SERVER_ERROR.status).json({ message: status.INTERNAL_SERVER_ERROR.message, err_code: status.INTERNAL_SERVER_ERROR.err_code });
    }
  }
});

// 게시물 삭제
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(status.UNAUTHORIZED.status).json({ message: status.UNAUTHORIZED.message, err_code: status.UNAUTHORIZED.err_code });
    }

    const postId = parseInt(req.params.id, 10);
    if (isNaN(postId)) {
      return res.status(status.ARTICLE_NOT_FOUND.status).json({ message: status.ARTICLE_NOT_FOUND.message, err_code: status.ARTICLE_NOT_FOUND.err_code });
    }

    await postService.deletePost(token, postId);
    res.status(status.SUCCESS.status).json({ message: status.SUCCESS }); // "message": "Post deleted successfully"
 
  } catch (error) {
    if (error instanceof Error) {
      res.status(status.BAD_REQUEST.status).json({ message: status.BAD_REQUEST.message, err_code: status.BAD_REQUEST.err_code });
    } else {
      res.status(status.INTERNAL_SERVER_ERROR.status).json({ message: status.INTERNAL_SERVER_ERROR.message, err_code: status.INTERNAL_SERVER_ERROR.err_code });
    }
  }
});

// 게시물 조회
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(status.UNAUTHORIZED.status).json({ message: status.UNAUTHORIZED.message, err_code: status.UNAUTHORIZED.err_code });
    }

    const postId = parseInt(req.params.id, 10);
    if (isNaN(postId)) {
      return res.status(status.ARTICLE_NOT_FOUND.status).json({ message: status.ARTICLE_NOT_FOUND.message, err_code: status.ARTICLE_NOT_FOUND.err_code });
    }

    const post = await postService.getPost(token, postId);
    res.status(status.SUCCESS.status).json(post);
  } catch (error) {
    if (error instanceof Error) {
      res.status(status.BAD_REQUEST.status).json({ message: status.BAD_REQUEST.message, err_code: status.BAD_REQUEST.err_code });
    } else {
      res.status(status.INTERNAL_SERVER_ERROR.status).json({ message: status.INTERNAL_SERVER_ERROR.message, err_code: status.INTERNAL_SERVER_ERROR.err_code });
    }
  }
});

export default router;