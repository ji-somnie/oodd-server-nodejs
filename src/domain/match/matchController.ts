import { Request, Response } from 'express';
import { MatchService } from './matchService';

const matchService = new MatchService();

export const requestMatch = async (req: Request, res: Response) => {
  const { userId, matchId } = req.body;
  const request = await matchService.requestMatch(userId, matchId);

  if (request) {
    res.status(200).send({ message: 'Match request sent' });
  } else {
    res.status(400).send({ message: 'Match request failed' });
  }
};

export const respondMatchRequest = async (req: Request, res: Response) => {
  const { requestId, accept } = req.body;
  const response = await matchService.respondMatchRequest(requestId, accept);

  if (response) {
    res.status(200).send({ message: 'Match request response sent' });
  } else {
    res.status(400).send({ message: 'Match request response failed' });
  }
};
