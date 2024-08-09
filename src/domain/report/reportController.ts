import { Request, Response } from 'express';
import { ReportService } from './reportService';
import { ReportPostRequest } from './dto/request';
import { HttpCode } from '../../variables/httpCode';
import BaseResponse from '../../base/baseResponse';

export class ReportController {
    private reportService: ReportService;

    constructor() {
        this.reportService = new ReportService();
    }

    async reportPost(req: Request, res: Response): Promise<Response> {
        try {
            
            const userId = req.user?.id;
            if (!userId) {
                return res.status(HttpCode.UNAUTHORIZED).json(BaseResponse.error('User not authenticated'));
            }
            
            const data: ReportPostRequest = req.body;
            const report = await this.reportService.reportPost(data, userId);

            return res.status(HttpCode.CREATED).json(BaseResponse.success({
                success: true,
                message: 'Post reported successfully',
                report,
            }));
        } catch (error) {
            return res.status(HttpCode.SERVER_ERROR).json(BaseResponse.error('Internal server error', error));
        }
    }
}
