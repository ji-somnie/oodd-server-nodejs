import {Request, Response, Router} from 'express';
import {OotdLikeService} from './ootdLikeService';
import {OotdLikeRequestDTO} from './dto/request';
import {OotdLikeResponseDTO} from './dto/response';

const likeService = new OotdLikeService();
const router = Router();

router.put('/toggle', async (req: Request, res: Response) => {
  try {
    const {userId, postId}: {userId: number; postId: number} = req.body;
    const like = await likeService.toggleLike(new OotdLikeRequestDTO(userId, postId));

    if (like) {
      const response: OotdLikeResponseDTO = new OotdLikeResponseDTO(like.id, like.userId, like.postId, like.createdAt);
      res.status(200).json(response);
    } else {
      res.status(204).send(); // No Content
    }
  } catch (error: any) {
    res.status(500).json({message: error.message});
  }
});

export default router;
