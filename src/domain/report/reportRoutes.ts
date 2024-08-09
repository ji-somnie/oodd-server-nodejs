// src/domain/report/reportRoutes.ts

import { Router } from 'express';
import { ReportController } from './reportController';

const router = Router();
const reportController = new ReportController();

router.post('/report', (req, res) => reportController.reportPost(req, res));

export default router;
