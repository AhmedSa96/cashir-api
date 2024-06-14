import { Module } from '@nestjs/common';
import { SalesController } from './sales.controller';
import { SalesService } from './sales.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sales } from './entities/sales.entity';
import { SalesProducts } from './entities/sales-products.entity';
import { SalesRepository } from './sales.repository';
import { SalesProductsRepository } from './sales-products.repository';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ Sales, SalesProducts ]),
    ProductsModule
  ],
  exports: [SalesRepository, SalesProductsRepository],
  controllers: [SalesController],
  providers: [SalesService, SalesRepository, SalesProductsRepository]
})
export class SalesModule {}
