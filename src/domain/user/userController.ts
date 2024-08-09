import { Request, Response } from 'express';
import { UserService } from './userService';
import BaseResponse from '../../base/baseResponse';
import HttpCode from '../../variables/httpCode';

export class UserController {
  private userService = new UserService();

  async getUserById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    try {
      const user = await this.userService.getUserById(Number(id));
      return res.json(BaseResponse.success(user));
    } catch (error) {
      const err = error as Error;
      return res.json(BaseResponse.error("Internal Server Error", err.message));
    }
  }
}
