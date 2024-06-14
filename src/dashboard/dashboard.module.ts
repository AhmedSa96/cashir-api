import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { SalesModule } from 'src/sales/sales.module';
import { PurchesesModule } from 'src/purcheses/purcheses.module';
import { ReceiptModule } from 'src/receipt/receipt.module';

@Module({
  imports: [SalesModule, PurchesesModule, ReceiptModule],
  controllers: [DashboardController],
  providers: [DashboardService]
})
export class DashboardModule {}
