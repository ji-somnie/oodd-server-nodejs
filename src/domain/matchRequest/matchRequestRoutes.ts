import { Router } from 'express';
import { MatchRequestController } from './matchRequestController';

const router = Router();
const matchRequestController = new MatchRequestController();

// Match request routes
router.post('/request', (req, res) => matchRequestController.requestMatch(req, res));
router.post('/respond', (req, res) => matchRequestController.respondToMatchRequest(req, res));

export default router;
