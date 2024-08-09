import { Request, Response } from 'express';

export class ReportController {
  static getAllReports(req: Request, res: Response) {
    // 모든 리포트 가져오기 로직 추가
    res.send('All reports');
  }

  static createReport(req: Request, res: Response) {
    const newReport = req.body;
    // 리포트 생성 로직 추가
    res.status(201).send('Report created');
  }
}

export default ReportController;

