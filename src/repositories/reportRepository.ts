import { EntityRepository, Repository } from 'typeorm';
import { ReportEntity } from '../entities/reportEntity';

@EntityRepository(ReportEntity)
export class ReportRepository extends Repository<ReportEntity> {}
