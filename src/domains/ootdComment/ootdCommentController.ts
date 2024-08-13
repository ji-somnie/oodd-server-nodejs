import {Request, Response, Router} from 'express';
import {CommentService} from './ootdCommentService';
import {PostCommentRequest} from './dtos/request';
import {CommentResponse, GetCommentResponse} from './dtos/response';
import {BaseResponse} from '../../base/baseResponse';
import {
  HTTP_OK,
  HTTP_INTERNAL_SERVER_ERROR,
  NOT_FOUND_POST,
  NO_AUTHORIZATION,
  INVALID_CONTENT,
  INVALID_COMMENT,
  INVALID_POST_ID,
} from '../../variables/httpCode';
import {authenticateJWT} from '../../middlewares/authMiddleware';
import {validatePostById} from '../../validationTest/validatePost';

const commentService = new CommentService();
const router = Router();

//댓글 생성
router.post('/:postId/comment', authenticateJWT, async (req: Request, res: Response) => {
  try {
    const postId: number = parseInt(req.params.postId);
    const user = req.user as any;
    const {content}: PostCommentRequest = req.body;

    if (!user || !user.id) {
      return res.status(401).json({
        isSuccess: false,
        code: NO_AUTHORIZATION.code,
        message: NO_AUTHORIZATION.message,
      });
    }

    // post 유효성 검사
    const postExists = await validatePostById(postId);
    if (!postExists) {
      return res.status(404).json({
        isSuccess: false,
        code: NOT_FOUND_POST.code,
        message: NOT_FOUND_POST.message,
      });
    }

    // content 유효성 검사
    if (!content || content.trim() === '' || content.length > 500) {
      return res.status(400).json({
        isSuccess: false,
        code: INVALID_CONTENT.code,
        message: INVALID_CONTENT.message,
      });
    }

    // 댓글 생성
    const comment = await commentService.createComment({userId: user.id, postId, content});

    // 응답 생성
    const response: BaseResponse<CommentResponse> = {
      isSuccess: true,
      code: HTTP_OK.code,
      message: HTTP_OK.message,
      result: {
        id: comment.id,
        userId: comment.user.id,
        postId: comment.post.id,
        content: comment.content,
        status: comment.status,
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt,
      },
    };

    res.status(201).json(response);
  } catch (error: any) {
    console.error('Comment Creation Error:', error);
    res.status(500).json({
      isSuccess: false,
      code: HTTP_INTERNAL_SERVER_ERROR.code,
      message: HTTP_INTERNAL_SERVER_ERROR.message,
    });
  }
});

//댓글 삭제
router.patch('/:postId/comment/:commentId', authenticateJWT, async (req: Request, res: Response) => {
  try {
    const postId = parseInt(req.params.postId);
    const commentId = parseInt(req.params.commentId);
    const user = req.user as any;

    // comment 유효성 검사
    const commentExists = await commentService.getCommentById(commentId);
    if (!commentExists) {
      return res.status(400).json({
        isSuccess: false,
        code: INVALID_COMMENT.code,
        message: INVALID_COMMENT.message,
      });
    }

    // post 유효성 검사
    const postExists = await validatePostById(postId);
    if (!postExists || commentExists.post?.id !== postId) {
      return res.status(400).json({
        isSuccess: false,
        code: INVALID_POST_ID.code,
        message: INVALID_POST_ID.message,
      });
    }

    // 사용자 유효성 검사
    if (!user || !user.id || commentExists.user?.id !== user.id) {
      return res.status(403).json({
        isSuccess: false,
        code: NO_AUTHORIZATION.code,
        message: NO_AUTHORIZATION.message,
      });
    }

    const comment = await commentService.deleteComment({commentId});

    const response: BaseResponse<CommentResponse> = {
      isSuccess: true,
      code: HTTP_OK.code,
      message: HTTP_OK.message,
      result: {
        id: comment.id,
        userId: comment.user?.id,
        postId: comment.post?.id,
        content: comment.content,
        status: comment.status,
        updatedAt: comment.updatedAt,
        deletedAt: comment.deletedAt || null,
      },
    };

    res.status(200).json(response);
  } catch (error: any) {
    console.error('Comment Deletion Error:', error);
    const response: BaseResponse<null> = {
      isSuccess: false,
      code: HTTP_INTERNAL_SERVER_ERROR.code,
      message: error.message,
    };
    res.status(500).json(response);
  }
});

//댓글 조회
router.get('/:postId/comments', authenticateJWT, async (req: Request, res: Response) => {
  try {
    const postId: number = parseInt(req.params.postId);
    const user = req.user as any;

    // post 유효성 검사
    const postExists = await validatePostById(postId);
    if (!postExists || postExists.status === 'deactivated') {
      return res.status(400).json({
        isSuccess: false,
        code: INVALID_POST_ID.code,
        message: INVALID_POST_ID.message,
      });
    }

    // 댓글 조회
    const comments = await commentService.getCommentsByPostIdAndUserId(postId, user.id);

    // 댓글이 없을 경우
    if (comments.length === 0) {
      const response: BaseResponse<null> = {
        isSuccess: false,
        code: INVALID_COMMENT.code,
        message: '해당 게시물에 작성한 댓글이 없습니다.',
      };
      return res.status(400).json(response);
    }

    // 댓글과 유저 정보를 동시에 반환
    const response: BaseResponse<GetCommentResponse> = {
      isSuccess: true,
      code: HTTP_OK.code,
      message: HTTP_OK.message,
      result: {
        comments: comments.map(comment => ({
          id: comment.id,
          postId: postId,
          content: comment.content,
          status: comment.status,
          createdAt: comment.createdAt,
          updatedAt: comment.updatedAt,
          deletedAt: comment.deletedAt || null,
          user: {
            id: comment.user.id,
            nickname: comment.user.nickname,
            profilePictureUrl: comment.user.profilePictureUrl,
          },
        })),
      },
    };

    res.status(200).json(response);
  } catch (error: any) {
    console.error('Comment Fetch Error:', error);
    const response: BaseResponse<null> = {
      isSuccess: false,
      code: HTTP_INTERNAL_SERVER_ERROR.code,
      message: error.message,
    };
    res.status(500).json(response);
  }
});

export default router;