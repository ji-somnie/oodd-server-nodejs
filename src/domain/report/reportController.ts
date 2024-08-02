import { Request, Response } from 'express';
import { ReportService } from './reportService';

const reportService = new ReportService();

export const reportPost = async (req: Request, res: Response) => {
  const { postId, reason } = req.body;
  const reported = await reportService.reportPost(postId, reason);

  if (reported) {
    res.status(200).send({ message: 'Report submitted successfully' });
  } else {
    res.status(400).send({ message: 'Report submission failed' });
  }
};

export const getReportReasons = async (req: Request, res: Response) => {
  const reasons = await reportService.getReportReasons();
  res.json(reasons);
};
