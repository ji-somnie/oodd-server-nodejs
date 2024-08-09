import { Router } from 'express';
import ReportController from './reportController';

const router = Router();

router.get('/', ReportController.getAllReports);
router.post('/', ReportController.createReport);

export default router;
