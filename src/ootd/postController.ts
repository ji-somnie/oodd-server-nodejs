import { Router, Request, Response } from 'express';
import { PostService } from './postService';
import { PostRequestDto } from './dtos/postRequest.dto';
import { status } from '../variables/httpCode'; 

const router = Router();
const postService = new PostService();

router.post('/', async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: status.UNAUTHORIZED, err_code: status.UNAUTHORIZED });
    }
    
    const postRequestDto: PostRequestDto = req.body;
    const newPost = await postService.createPost(token, postRequestDto);
    res.status(201).json(newPost);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: status.BAD_REQUEST, err_code: status.BAD_REQUEST });
    } else {
      res.status(500).json({ message: status.INTERNAL_SERVER_ERROR, err_code: status.INTERNAL_SERVER_ERROR });
    }
  }
});

export default router;
