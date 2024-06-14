import { Injectable } from '@nestjs/common';
import { PurchesesRepository } from 'src/purcheses/purcheses.repository';
import { ClientReceiptsRepository } from 'src/receipt/client-receipts.repository';
import { SupplierReceiptsRepository } from 'src/receipt/supplier-receipts.repository';
import { SalesRepository } from 'src/sales/sales.repository';
import { Equal, EqualOperator } from 'typeorm';
import { GetDashboardFilters } from './models/get-dashboard-filters.dto';

@Injectable()
export class DashboardService {
  constructor(
    private readonly salesRepository: SalesRepository,
    private readonly purchesesRepository: PurchesesRepository,
    private readonly clientReceiptsRepository: ClientReceiptsRepository,
    private readonly supplierReceiptsRepository: SupplierReceiptsRepository,
  ) {}

  public async getData(filters: GetDashboardFilters) {
    
    const sales = await this.salesRepository.dashboard(filters);
    // const totalSales = sales.orders.length === 0 ? 0 : sales.orders.map(sale => sale.paymentAmount).reduce((acc, value) => acc += value)

    const purcheses = await this.purchesesRepository.dashboard(filters);
    // const totalPurcheses = purcheses.orders.length === 0 ? 0 : purcheses.orders.map(purches => purches.paymentAmount).reduce((acc, value) => acc += value)

    const clientReceipts = await this.clientReceiptsRepository.dashboard(filters);
    // const totalClientReceipts = clientReceipts.orders.length === 0 ? 0 : clientReceipts.orders.map(clientReceipt => clientReceipt.amount).reduce((acc, value) => acc += value)

    const supplierReceipts = await this.supplierReceiptsRepository.dashboard(filters);
    // const totalSupplierReceipts = supplierReceipts.orders.length === 0 ? 0 : supplierReceipts.orders.map(supplierReceipt => supplierReceipt.amount).reduce((acc, value) => acc += value)

    return {
      // total: {
      //   income: totalSales + totalClientReceipts,
      //   outcome: totalPurcheses + totalSupplierReceipts
      // },
      sales,
      purcheses,
      clientReceipts,
      supplierReceipts,
    };
  }
}
