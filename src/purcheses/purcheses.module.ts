import { Module } from '@nestjs/common';
import { PurchesesController } from './purcheses.controller';
import { PurchesesService } from './purcheses.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Purches } from './entities/purches.entity';
import { PurchesesProducts } from './entities/purcheses-products.entity';
import { PurchesesRepository } from './purcheses.repository';
import { PurchesesProductsRepository } from './purcheses-products.repository';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ Purches, PurchesesProducts ]),
    ProductsModule
  ],
  exports: [PurchesesRepository, PurchesesProductsRepository],
  controllers: [PurchesesController],
  providers: [PurchesesService, PurchesesRepository, PurchesesProductsRepository]
})
export class PurchesesModule {}
