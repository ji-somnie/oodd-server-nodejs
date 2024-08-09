import { Router, Request, Response } from "express";
import { BlockService } from "./blockService";
import { status } from '../../variables/httpCode';


const router = Router();
const blockService = new BlockService();

router.post("/", async (req: Request, res: Response) => {

  const { userId, friendId, action } = req.body;

  if (!userId || !friendId || action !== 'toggle') {
    return res.status(400).json({ message: 'Invalid request data' });
  }

  try {
    const result = await blockService.toggleBlock(userId, friendId);
    res.status(200).json({ message: result });
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }

});


export default router;
