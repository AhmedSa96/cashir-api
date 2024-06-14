import { Module } from '@nestjs/common';
import { ReceiptController } from './receipt.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientReceipt } from './entities/client-receipt.entity';
import { SupplierReceipt } from './entities/supplier-receipt.entity';
import { ClientReceiptsRepository } from './client-receipts.repository';
import { SupplierReceiptsRepository } from './supplier-receipts.repository';
import { ClientReceiptService } from './services/client-receipt/client-receipt.service';
import { SupplierReceiptService } from './services/supplier-receipt/supplier-receipt.service';
import { ClientReceiptController } from './client-receipt.controller';
import { SupplierReceiptController } from './supplier-receipt.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([ ClientReceipt, SupplierReceipt ])
  ],
  exports: [ClientReceiptsRepository, SupplierReceiptsRepository],
  controllers: [ReceiptController, ClientReceiptController, SupplierReceiptController],
  providers: [ClientReceiptsRepository, SupplierReceiptsRepository, ClientReceiptService, SupplierReceiptService]
})
export class ReceiptModule {}
