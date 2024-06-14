import { Injectable } from '@nestjs/common';
import {
  And,
  DataSource,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { ClientReceipt } from './entities/client-receipt.entity';
import { GetClientReceiptsFiltersDto } from './models/get-client-receipts-filters.dto';
import moment from 'moment';
import { GetDashboardFilters } from 'src/dashboard/models/get-dashboard-filters.dto';
import { configureDate } from 'src/shared/utils/configure-date';

@Injectable()
export class ClientReceiptsRepository extends Repository<ClientReceipt> {
  constructor(dataSource: DataSource) {
    super(ClientReceipt, dataSource.createEntityManager());
  }

  async dashboard(filters: GetDashboardFilters) {
    const today = moment();

    const startDate = configureDate(filters.fromDate) ?? today.clone();
    const endDate = configureDate(filters.toDate) ?? today.clone();

    const query = this.createQueryBuilder('clientReceipts')
      .andWhere({
        componyId: filters.userId,
        createdAt: And(
          MoreThanOrEqual(startDate.format('YYYY-MM-DD')),
          LessThanOrEqual(endDate.add({ day: 1 }).format('YYYY-MM-DD')),
        ),
      })
      .leftJoinAndSelect('clientReceipts.client', 'client');
    // .andWhere('clientReceipts.createdAt >= :date', {
    //   date: startDate.format('YYYY-MM-DD'),
    // })
    // .andWhere('clientReceipts.createdAt < :date', {
    //   date: endDate.format('YYYY-MM-DD'),
    // });

    const [orders, count] = await query.getManyAndCount();

    return { orders, count };
  }

  public async findByFilters(filters: GetClientReceiptsFiltersDto) {
    const query = this.createQueryBuilder('clientReceipt').leftJoinAndSelect(
      'clientReceipt.client',
      'client',
    );

    if (filters.clientId) query.andWhere({ clientId: filters.clientId });

    if (filters.fromDate) query.andWhere('"clientReceipt"."createdAt" >= :fromDate', { fromDate: filters.fromDate });

    if (filters.toDate) query.andWhere('"clientReceipt"."createdAt" <= :toDate', { toDate: filters.toDate });
    
    return await query.paginate(filters);
  }
}
