// src/domain/report/dto/response.ts

export interface ReportReasonResponse {
    id: number;
    reason: string;
}

export interface GetReportReasonsResponse {
    reasons: ReportReasonResponse[];
}
