import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductsRepository } from './products.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductImage } from './entities/product-image.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, ProductImage]),
  ],
  exports: [ProductsRepository, ProductsService],
  providers: [ProductsService, ProductsRepository],
  controllers: [ProductsController]
})
export class ProductsModule {}
