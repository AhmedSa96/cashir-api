import { Injectable, NotFoundException, NotImplementedException } from '@nestjs/common';
import { SalesRepository } from './sales.repository';
import { GetSalesFiltersDto } from './models/get-sales-filters.dto';
import { CreateSaleDto } from './models/create-sale.dto';
import { UpdateSaleDto } from './models/update-sale.dto';
import { SalesProductsRepository } from './sales-products.repository';
import { ProductsRepository } from 'src/products/products.repository';
import { DataSource } from 'typeorm';
import { Sales } from './entities/sales.entity';
import { SalesProducts } from './entities/sales-products.entity';
import { Product } from 'src/products/entities/product.entity';
// import { DataSource } from 'typeorm';

@Injectable()
export class SalesService {
  constructor(
    private readonly repository: SalesRepository,
    private readonly dataSource: DataSource,
  ) {}

  async getAll(filters: GetSalesFiltersDto) {
    return await this.repository.findByFilters(filters);
  }

  async findById(id: number) {
    const record = await this.repository.findOne({
      relations: ['client', 'saleProducts'],
      where: { id },
    });

    if (record) throw new NotFoundException();

    return record;
  }

  async create(dto: CreateSaleDto, componyId: number) {
    const runner = this.dataSource.createQueryRunner();
    await runner.connect();
    await runner.startTransaction();
    try {
      const newSale = this.repository.create({ ...dto, componyId });
      const sale = await runner.manager.getRepository(Sales).save(newSale);
      
      for (let index = 0; index < dto.products.length; index++) {
        const item = dto.products[index];
        const newSaleProduct = runner.manager.getRepository(SalesProducts).create({
          ...item,
          saleId: sale.id,
        });

        const saleProduct = await runner.manager.getRepository(SalesProducts).save(newSaleProduct);
        
        const product = await runner.manager.getRepository(Product).findOne({
          where: { id: saleProduct.productId },
        });

        product.stock -= item.quantity;

        await runner.manager.getRepository(Product).save(product);
      }

      await runner.commitTransaction();
      await runner.release();

      return sale;
    } catch (error) {
      await runner.rollbackTransaction();
      await runner.release();
      throw error;
    }
  }

  async update(id: number, dto: UpdateSaleDto) {
    throw new NotImplementedException();
    const sale = await this.findById(id);

    const newSale = this.repository.merge(sale, dto, { id });

    return await this.repository.save(newSale);
  }

  async remove(id: number) {
    throw new NotImplementedException();
    const sale = await this.findById(id);

    return await this.repository.softRemove(sale);
  }
}
