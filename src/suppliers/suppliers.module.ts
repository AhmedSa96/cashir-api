import { Module } from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { SupplierRepository } from './supplier.repository';
import { SuppliersController } from './suppliers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Supplier } from './entities/supplier.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ Supplier ]),
  ],
  controllers: [SuppliersController],
  providers: [SuppliersService, SupplierRepository]
})
export class SuppliersModule {}
