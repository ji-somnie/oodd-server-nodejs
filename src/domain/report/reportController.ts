import { Request, Response } from 'express';
import BaseResponse from '../../base/baseResponse';
import HttpCode from '../../variables/httpCode';
import { ReportService } from './reportService';  // ReportService import 추가

export class ReportController {
  private reportService = new ReportService();

  async createReport(req: Request, res: Response): Promise<Response> {
    const { reporterId, postId, reason } = req.body;
    try {
      const report = await this.reportService.createReport(reporterId, postId, reason);
      return res.json(BaseResponse.success(report));
    } catch (error) {
      const err = error as Error;
      return res.json(BaseResponse.error("Internal Server Error", err.message));
    }
  }

  async getAllReports(req: Request, res: Response): Promise<Response> {
    try {
      const reports = await this.reportService.getAllReports();
      return res.json(BaseResponse.success(reports));
    } catch (error) {
      const err = error as Error;
      return res.json(BaseResponse.error("Internal Server Error", err.message));
    }
  }
}
