import { Request, Response } from 'express';
import { MatchRequestService } from './matchRequestService';
import { BaseResponse } from '../../base/baseResponse';
import { HttpCode } from '../../variables/httpCode';

export class MatchRequestController {
  private matchRequestService = new MatchRequestService();

  async createMatchRequest(req: Request, res: Response): Promise<Response> {
    const { requesterId, requesteeId } = req.body;
    try {
      const matchRequest = await this.matchRequestService.createMatchRequest(requesterId, requesteeId);
      return res.json(new BaseResponse(true, HttpCode.SUCCESS, "Match request created", matchRequest));
    } catch (error) {
      return res.json(new BaseResponse(false, HttpCode.INVALID_USER, error.message));
    }
  }
}
