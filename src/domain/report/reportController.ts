import { Request, Response } from "express";
import { ReportService } from "./reportService";
import { ReportPostRequest } from "./dto/request";
import { BaseResponse } from "../../base/baseResponse";
import { HttpCode } from "../../base/httpCode";

export class ReportController {
    private reportService = new ReportService();

    async reportPost(req: Request, res: Response): Promise<void> {
        const reportRequest: ReportPostRequest = req.body;
        try {
            await this.reportService.reportPost(reportRequest);
            const response: BaseResponse<null> = {
                isSuccess: true,
                code: HttpCode.SUCCESS,
                message: "Post reported successfully",
                result: null,
            };
            res.json(response);
        } catch (error) {
            res.status(HttpCode.SERVER_ERROR).json({
                isSuccess: false,
                code: HttpCode.SERVER_ERROR,
                message: error.message,
                result: null,
            });
        }
    }
}
