// src/domain/user/userController.ts

import { Request, Response } from 'express';
import { UserService } from './userService';
import { HttpCode } from '../../variables/httpCode'; 
import BaseResponse from '../../base/baseResponse'; 

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    async getUserById(req: Request, res: Response): Promise<Response> {
        try {
            const userId = parseInt(req.params.id, 10);
            const user = await this.userService.getUserById(userId);

            if (user) {
                return res.status(HttpCode.SUCCESS).json(BaseResponse.success(user));
            } else {
                return res.status(HttpCode.NOT_FOUND).json(BaseResponse.error('User not found'));
            }
        } catch (error) {
            return res.status(HttpCode.SERVER_ERROR).json(BaseResponse.error('Internal server error', error));
        }
    }
}
