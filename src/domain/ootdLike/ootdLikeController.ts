// src/domain/ootdLike/ootdLikeController.ts
import {Request, Response, Router} from 'express';
import {OotdLikeService} from './ootdLikeService';
import {OotdLikeRequest} from './dto/request';

const likeService = new OotdLikeService();
const router = Router();

router.get('/check', async (req: Request, res: Response) => {
  try {
    const {postId, userId}: {postId: number; userId: number} = req.query as any;

    if (typeof postId !== 'number' || typeof userId !== 'number') {
      return res.status(400).json({message: 'Invalid request parameters'});
    }

    const likeExists = await likeService.checkLike({postId, userId});

    res.status(200).json({exists: likeExists});
  } catch (error: any) {
    res.status(500).json({message: error.message});
  }
});

export default router;
