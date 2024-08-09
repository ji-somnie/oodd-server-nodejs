import { Router } from 'express';
import { MatchRequestController } from './matchRequestController';

export const matchRequestRoutes = Router();

const matchRequestController = new MatchRequestController();

matchRequestRoutes.post('/', matchRequestController.createMatchRequest);
matchRequestRoutes.get('/', matchRequestController.getMatchRequests);
