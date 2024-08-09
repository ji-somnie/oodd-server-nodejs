import { EntityRepository, Repository } from 'typeorm';
import { MatchRequestEntity } from '../entities/matchRequestEntity';

@EntityRepository(MatchRequestEntity)
export class MatchRequestRepository extends Repository<MatchRequestEntity> {}
