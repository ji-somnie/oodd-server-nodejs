import { Request, Response } from 'express';
import { MatchRequestService } from './matchRequestService';

export class MatchRequestController {
  private matchRequestService = new MatchRequestService();

  getMatchRequests = async (req: Request, res: Response) => {
    const matchRequests = await this.matchRequestService.findAllMatchRequests();
    res.json(matchRequests);
  };

  createMatchRequest = async (req: Request, res: Response) => {
    const matchRequest = await this.matchRequestService.createMatchRequest(req.body);
    res.status(201).json(matchRequest);
  };
}

