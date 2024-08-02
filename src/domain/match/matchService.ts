import { getRepository } from 'typeorm';
import { MatchRequest } from './entities/matchRequestEntity';
import { User } from '../user/entities/userEntity';

export class MatchService {
  private matchRequestRepository = getRepository(MatchRequest);
  private userRepository = getRepository(User);

  async requestMatch(userId: number, matchId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const matchUser = await this.userRepository.findOne({ where: { id: matchId } });

    if (!user || !matchUser) {
      return null;
    }

    const matchRequest = new MatchRequest();
    matchRequest.requester = user;
    matchRequest.receiver = matchUser;
    matchRequest.status = 'pending';
    return await this.matchRequestRepository.save(matchRequest);
  }

  async respondMatchRequest(requestId: number, accept: boolean) {
    const matchRequest = await this.matchRequestRepository.findOne({ where: { id: requestId }, relations: ['requester', 'receiver'] });
    if (!matchRequest) {
      return null;
    }

    matchRequest.status = accept ? 'accepted' : 'rejected';
    return await this.matchRequestRepository.save(matchRequest);
  }
}
