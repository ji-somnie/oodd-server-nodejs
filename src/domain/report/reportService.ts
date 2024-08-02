import { getRepository } from 'typeorm';
import { Report } from './entities/reportEntity';
import { Post } from '../user/entities/postEntity';

export class ReportService {
  private reportRepository = getRepository(Report);
  private postRepository = getRepository(Post);

  async reportPost(postId: number, reason: string) {
    const post = await this.postRepository.findOne({ where: { id: postId } });
    if (!post) {
      return null;
    }

    const report = new Report();
    report.post = post;
    report.reason = reason;
    return await this.reportRepository.save(report);
  }

  async getReportReasons() {
    return [
      'Spam',
      'Abusive Content',
      'False Information',
      'Other'
    ];
  }
}

}
