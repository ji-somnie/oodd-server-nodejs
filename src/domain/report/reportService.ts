import { myDataBase } from "../../utils/data-source";
import { ReportPostRequest } from "./dto/request";
import { ReportEntity } from "../../entities/reportEntity";

export class ReportService {
    private reportRepository = myDataBase.getRepository(ReportEntity);

    async reportPost(reportRequest: ReportPostRequest): Promise<void> {
        const report = this.reportRepository.create(reportRequest);
        await this.reportRepository.save(report);
    }
}
