// src/domain/report/reportRoutes.ts

import { Router } from 'express';
import { ReportController } from './reportController';

const router = Router();
const reportController = new ReportController();

router.get('/reasons', (req, res) => reportController.getReportReasons(req, res));

export default router;
