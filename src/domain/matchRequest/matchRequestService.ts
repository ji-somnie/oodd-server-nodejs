// src/domain/matchRequest/matchRequestService.ts
import { myDataBase } from '../../utils/data-source';
import { MatchRequest } from '../../entities/matchRequestEntity';
import { User } from '../../entities/userEntity';

export class MatchRequestService {
  private matchRequestRepository = myDataBase.getRepository(MatchRequest);
  private userRepository = myDataBase.getRepository(User);

  async createMatchRequest(requesterId: number, requesteeId: number): Promise<MatchRequest> {
    const requester = await this.userRepository.findOne({ where: { id: requesterId } });
    const requestee = await this.userRepository.findOne({ where: { id: requesteeId } });

    if (!requester || !requestee) {
      throw new Error('Invalid users');
    }

    const matchRequest = this.matchRequestRepository.create({
      requester,
      requestee,
      status: 'pending'
    });

    return await this.matchRequestRepository.save(matchRequest);
  }

  async respondToMatchRequest(matchRequestId: number, response: 'accepted' | 'rejected'): Promise<MatchRequest> {
    const matchRequest = await this.matchRequestRepository.findOne({ where: { id: matchRequestId } });

    if (!matchRequest) {
      throw new Error('Invalid match request');
    }

    matchRequest.status = response;
    return await this.matchRequestRepository.save(matchRequest);
  }
}
