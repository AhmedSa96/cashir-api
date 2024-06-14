import { Injectable } from '@nestjs/common';
import { DataSource, Like, Repository } from 'typeorm';
import { Supplier } from './entities/supplier.entity';
import { GetSuppliersFilters } from './models/get-suppliers-filters.dto';

@Injectable()
export class SupplierRepository extends Repository<Supplier> {
  constructor(dataSource: DataSource) {
    super(Supplier, dataSource.createEntityManager());
  }

  findByFilters(filters: GetSuppliersFilters) {
    const query = this.createQueryBuilder('supplier');

    if (filters.search) query.andWhere({ name: Like(`${filters.search}%`) });

    if (filters.fromDate) query.andWhere('"createdAt" >= :fromDate', { fromDate: filters.fromDate });

    if (filters.toDate) query.andWhere('"createdAt" <= :toDate', { toDate: filters.toDate });
    
    return query.paginate(filters);
  }
}
