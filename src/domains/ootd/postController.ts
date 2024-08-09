import {Router, Request, Response} from 'express';
import {PostService} from './postService';
import {PostRequestDto} from './dtos/postRequest.dto';
import {HTTP_OK, HTTP_BAD_REQUEST, HTTP_INTERNAL_SERVER_ERROR} from '../../variables/httpCode';

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
      res.status(201).json(newPostResponse);
    }
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      res.status(400).json({message: HTTP_BAD_REQUEST.message});
    } else {
      res.status(500).json({message: HTTP_INTERNAL_SERVER_ERROR.message});
    }
  }
});

// 게시물 삭제
router.delete('/:postId', async (req: Request, res: Response): Promise<void> => {
  try {
    const postId = parseInt(req.params.postId, 10);

    const deletePostResponse = await postService.deletePost(userId, postId);

    if (deletePostResponse.isSuccess) {
      res.status(201).json(deletePostResponse);
    }
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      res.status(400).json({message: HTTP_BAD_REQUEST.message});
    } else {
      res.status(500).json({message: HTTP_INTERNAL_SERVER_ERROR.message});
    }
  }
});

// 게시물 수정
router.patch('/:postId', async (req: Request, res: Response): Promise<void> => {
  try {
    const postId = parseInt(req.params.postId, 10);
    const postRequestDto: PostRequestDto = req.body;

    const updatePostResponse = await postService.updatePost(userId, postId, postRequestDto);

    if (updatePostResponse.isSuccess) {
      res.status(201).json(updatePostResponse);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({message: HTTP_INTERNAL_SERVER_ERROR.message});
  }
});

// 게시물 조회
router.get('/:postId', async (req: Request, res: Response): Promise<void> => {
  try {
    const postId = parseInt(req.params.postId, 10);

    const getPostResponse = await postService.getPostById(userId, postId);

    if (getPostResponse.isSuccess) {
      res.status(200).json(getPostResponse);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({message: HTTP_INTERNAL_SERVER_ERROR.message});
  }
});

// 스타일태그 검색 결과 조회
router.get('/:styletag', async (req: Request, res: Response): Promise<void> => {
  try {
    const tag = req.params.styletag;

    const getPostsByTagResponse = await postService.getPostsByTag(userId, tag);

    if (getPostsByTagResponse.isSuccess) {
      res.status(200).json(getPostsByTagResponse);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({message: HTTP_INTERNAL_SERVER_ERROR.message});
  }
});

export default router;
