import { Request, Response } from 'express';
import { MatchRequestService } from './matchRequestService';
import BaseResponse from '../../base/baseResponse';  // baseResponse 클래스 import
import HttpCode from '../../variables/httpCode';  // httpCode import

export class MatchRequestController {
  private matchRequestService = new MatchRequestService();

  async requestMatch(req: Request, res: Response): Promise<Response> {
    const { userId, matchId } = req.body;
    try {
      const matchRequest = await this.matchRequestService.createMatchRequest(userId, matchId);
      return res.json(BaseResponse.success("Match request created successfully"));
    } catch (error) {
      const err = error as Error;
      return res.json(BaseResponse.error("Internal Server Error", err.message));
    }
  }

  async respondToMatchRequest(req: Request, res: Response): Promise<Response> {
    const { requestId, response } = req.body;
    try {
      const matchRequest = await this.matchRequestService.respondToMatchRequest(requestId, response);
      return res.json(BaseResponse.success("Match request responded successfully"));
    } catch (error) {
      const err = error as Error;
      return res.json(BaseResponse.error("Internal Server Error", err.message));
    }
  }
}
