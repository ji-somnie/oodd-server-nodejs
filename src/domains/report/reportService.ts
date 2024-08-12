// src/domain/report/reportService.ts

import { GetReportReasonsResponse, ReportReasonResponse } from './dtos/response';

export class ReportService {
    async getReportReasons(): Promise<GetReportReasonsResponse> {
        const reasons: ReportReasonResponse[] = [
            { id: 1, reason: '부적절한 내용' },
            { id: 2, reason: '스팸' },
            { id: 3, reason: '저작권 침해' },
        ];

        return { reasons };
    }
}
