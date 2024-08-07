import { Router, Request, Response } from 'express';
import { HTTP_OK, HTTP_INTERNAL_SERVER_ERROR } from '../../variables/httpCode';

const chatRouter = Router();

// OOTD 조회
chatRouter.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const response = await ootdService.getOotds();

    if (response.isSuccess) {
      res.status(HTTP_OK.code).json(response);
    } else {
      res.status(response.code).json({ message: response.message });
    }
  } catch (error) {
    console.error(error);
    res.status(HTTP_INTERNAL_SERVER_ERROR.code).json({ message: HTTP_INTERNAL_SERVER_ERROR.message });
  }
});

export default chatRouter;
