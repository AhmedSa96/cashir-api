import { Injectable } from '@nestjs/common';
import {
  And,
  DataSource,
  LessThanOrEqual,
  Like,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { Purches } from './entities/purches.entity';
import { GetPurchesesFiltersDto } from './models/get-purches-filters.dto';
import moment from 'moment';
import { configureDate } from 'src/shared/utils/configure-date';
import { GetDashboardFilters } from 'src/dashboard/models/get-dashboard-filters.dto';

@Injectable()
export class PurchesesRepository extends Repository<Purches> {
  constructor(dataSource: DataSource) {
    super(Purches, dataSource.createEntityManager());
  }

  async dashboard(filters: GetDashboardFilters) {
    const today = moment();

    const startDate = configureDate(filters.fromDate) ?? today.clone();
    const endDate = configureDate(filters.toDate) ?? today.clone();

    const query = this.createQueryBuilder('purcheses').andWhere({
      componyId: filters.userId,
      createdAt: And(
        MoreThanOrEqual(startDate.format('YYYY-MM-DD')),
        LessThanOrEqual(endDate.add({ day: 1 }).format('YYYY-MM-DD')),
      ),
    }).leftJoinAndSelect("purcheses.supplier", "supplier");
    // .andWhere('purcheses.createdAt >= :date', {
    //   date: startDate.format('YYYY-MM-DD'),
    // })
    // .andWhere('purcheses.createdAt < :date', {
    //   date: endDate.format('YYYY-MM-DD'),
    // });

    const [orders, count] = await query.getManyAndCount();

    return { orders, count };
  }

  async findByFilters({
    fromDate,
    toDate,
    page,
    perPage,
    idLike,
  }: GetPurchesesFiltersDto) {
    const query = this.createQueryBuilder('purches').leftJoinAndSelect(
      'purches.supplier',
      'supplier',
    );

    if (idLike) query.andWhere({ id: idLike });

    if (fromDate) query.andWhere('purches."createdAt" >= :fromDate', { fromDate });

    if (toDate) query.andWhere('purches."createdAt" <= :toDate', { toDate });
    
    return await query.paginate({ page, perPage });
  }
}
