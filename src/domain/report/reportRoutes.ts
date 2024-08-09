import { Router } from 'express';
import { ReportController } from './reportController';

const router = Router();
const reportController = new ReportController();

// Report routes
router.get('/', (req, res) => reportController.getAllReports(req, res));  // 수정: getReports -> getAllReports
router.post('/create', (req, res) => reportController.createReport(req, res));

export default router;
