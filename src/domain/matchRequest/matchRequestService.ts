import { MatchRequestEntity } from '../../entities/matchRequestEntity';
import { getRepository } from 'typeorm';

export class MatchRequestService {
  private matchRequestRepository = getRepository(MatchRequestEntity);

  async findAllMatchRequests(): Promise<MatchRequestEntity[]> {
    return this.matchRequestRepository.find();
  }

  async createMatchRequest(data: Partial<MatchRequestEntity>): Promise<MatchRequestEntity> {
    const matchRequest = this.matchRequestRepository.create(data);
    return this.matchRequestRepository.save(matchRequest);
  }
}
