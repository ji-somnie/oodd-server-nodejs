import { getRepository } from 'typeorm';
import { UserEntity } from '../../entities/userEntity';
import { MatchRequestEntity } from '../../entities/matchRequestEntity';

export class MatchRequestService {
  async createMatchRequest(userId: number, matchId: number): Promise<MatchRequestEntity> {
    const userRepository = getRepository(UserEntity);
    const requester = await userRepository.findOne({ where: { id: userId } });
    const requestee = await userRepository.findOne({ where: { id: matchId } });

    if (!requester || !requestee) {
      throw new Error("User not found");
    }

    const matchRequestRepository = getRepository(MatchRequestEntity);
    const newMatchRequest = new MatchRequestEntity();
    newMatchRequest.requester = requester;
    newMatchRequest.requestee = requestee;
    newMatchRequest.status = 'PENDING';

    return await matchRequestRepository.save(newMatchRequest);
  }

  async respondToMatchRequest(requestId: number, response: boolean): Promise<MatchRequestEntity> {
    const matchRequestRepository = getRepository(MatchRequestEntity);
    const matchRequest = await matchRequestRepository.findOne({ where: { id: requestId } });

    if (!matchRequest) {
      throw new Error("Match Request not found");
    }

    matchRequest.status = response ? 'ACCEPTED' : 'REJECTED';

    return await matchRequestRepository.save(matchRequest);
  }
}
