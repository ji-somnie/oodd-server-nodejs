// src/domain/report/reportController.ts

import { Request, Response } from 'express';
import { ReportService } from './reportService';
import { HttpCode } from '../../variables/httpCode';
import BaseResponse from '../../base/baseResponse';

export class ReportController {
    private reportService: ReportService;

    constructor() {
        this.reportService = new ReportService();
    }

    async getReportReasons(req: Request, res: Response): Promise<Response> {
        try {
            const data = await this.reportService.getReportReasons();
            return res.status(HttpCode.SUCCESS).json(BaseResponse.success(data));
        } catch (error) {
            return res.status(HttpCode.SERVER_ERROR).json(BaseResponse.error('Internal server error', error));
        }
    }
}
