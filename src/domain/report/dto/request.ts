// src/domain/report/dto/request.ts

export interface ReportPostRequest {
    postId: number;
    reason: string;
    details?: string;
}
