import { Injectable } from '@nestjs/common';
import {
  DataSource,
  Like,
  MoreThanOrEqual,
  Repository,
  And,
  LessThanOrEqual,
} from 'typeorm';
import { Sales } from './entities/sales.entity';
import { GetSalesFiltersDto } from './models/get-sales-filters.dto';
import moment from 'moment';
import { GetDashboardFilters } from 'src/dashboard/models/get-dashboard-filters.dto';
import { configureDate } from 'src/shared/utils/configure-date';

@Injectable()
export class SalesRepository extends Repository<Sales> {
  constructor(dataSource: DataSource) {
    super(Sales, dataSource.createEntityManager());
  }

  async dashboard(filters: GetDashboardFilters) {
    const today = moment();

    const startDate = configureDate(filters.fromDate) ?? today.clone();
    const endDate = configureDate(filters.toDate) ?? today.clone();

    const query = this.createQueryBuilder('sales')
      .andWhere({
        componyId: filters.userId,
        createdAt: And(
          MoreThanOrEqual(startDate.format('YYYY-MM-DD')),
          LessThanOrEqual(endDate.add({ day: 1 }).format('YYYY-MM-DD')),
        ),
      })
      .leftJoinAndSelect('sales.client', 'client');
    // .andWhere('sales.createdAt >= :date', {
    //   date: startDate.format('YYYY-MM-DD'),
    // })
    // .andWhere('sales.createdAt < :date', {
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
  }: GetSalesFiltersDto) {
    const query = this.createQueryBuilder('sales')
      .orderBy('sales.createdAt', 'DESC', 'NULLS LAST')
      .leftJoinAndSelect('sales.client', 'client');

    if (idLike) query.andWhere({ id: idLike });

    if (fromDate) query.andWhere('sales."createdAt" >= :fromDate', { fromDate });

    if (toDate) query.andWhere('sales."createdAt" <= :toDate', { toDate });
    
    return await query.paginate({ page, perPage });
  }
}
