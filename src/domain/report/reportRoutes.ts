import { Router } from "express";
import { ReportController } from "./reportController";

const router = Router();
const reportController = new ReportController();

router.post("/reportPost", reportController.reportPost.bind(reportController));

export default router;
