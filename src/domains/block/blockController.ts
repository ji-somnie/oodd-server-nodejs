import { Router, Request, Response } from "express";
import { BlockService } from "./blockService";
import {
  HTTP_OK,
  HTTP_BAD_REQUEST,
  HTTP_INTERNAL_SERVER_ERROR,
} from '../../variables/httpCode';
import { authenticateJWT } from '../../middlewares/authMiddleware';


const router = Router();
const blockService = new BlockService();

router.post("/", authenticateJWT, async (req: Request, res: Response) => {

  const { userId, friendId, action } = req.body;

  if (!userId || !friendId || action !== 'toggle') {
    return res.status(400).json({message: HTTP_BAD_REQUEST.message});
    //return res.status(400).json({ message: 'Invalid request data' });
  }

  try {
    const result = await blockService.toggleBlock(userId, friendId);
    res.status(200).json({message: HTTP_OK.message});
    //res.status(200).json({ message: result });
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({message: HTTP_INTERNAL_SERVER_ERROR.message});
    //res.status(500).json({ message: 'Internal Server Error' });
  }

});


export default router;
