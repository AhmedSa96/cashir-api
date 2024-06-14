import { Injectable } from '@nestjs/common';
import {
  And,
  DataSource,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { SupplierReceipt } from './entities/supplier-receipt.entity';
import { GetSupplierReceiptsFiltersDto } from './models/get-supplier-receipts-filters.dto';
import { GetDashboardFilters } from 'src/dashboard/models/get-dashboard-filters.dto';
import moment from 'moment';
import { configureDate } from 'src/shared/utils/configure-date';

@Injectable()
export class SupplierReceiptsRepository extends Repository<SupplierReceipt> {
  constructor(dataSource: DataSource) {
    super(SupplierReceipt, dataSource.createEntityManager());
  }

  async dashboard(filters: GetDashboardFilters) {
    const today = moment();

    const startDate = configureDate(filters.fromDate) ?? today.clone();
    const endDate = configureDate(filters.toDate) ?? today.clone();

    const query = this.createQueryBuilder('supplierReceipts')
      .andWhere({
        componyId: filters.userId,
        createdAt: And(
          MoreThanOrEqual(startDate.format('YYYY-MM-DD')),
          LessThanOrEqual(endDate.add({ day: 1 }).format('YYYY-MM-DD')),
        ),
      })
      .leftJoinAndSelect('supplierReceipts.supplier', 'supplier');
    // .andWhere('supplierReceipts.createdAt >= :date', {
    //   date: startDate.format('YYYY-MM-DD'),
    // })
    // .andWhere('supplierReceipts.createdAt < :date', {
    //   date: endDate.format('YYYY-MM-DD'),
    // });

    const [orders, count] = await query.getManyAndCount();

    return { orders, count };
  }

  public async findByFilters(filters: GetSupplierReceiptsFiltersDto) {
    const query = this.createQueryBuilder('supplierReceipt').leftJoinAndSelect(
      'supplierReceipt.supplier',
      'client',
    );

    if (filters.supplierId) query.andWhere({ supplierId: filters.supplierId });

    if (filters.fromDate) query.andWhere('"supplierReceipt"."createdAt" >= :fromDate', { fromDate: filters.fromDate });

    if (filters.toDate) query.andWhere('"supplierReceipt"."createdAt" <= :toDate', { toDate: filters.toDate });
    
    return await query.paginate(filters);
  }
}
