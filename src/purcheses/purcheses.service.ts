import { Injectable, NotFoundException } from '@nestjs/common';
import { PurchesesRepository } from './purcheses.repository';
import { DataSource } from 'typeorm';
import { GetPurchesesFiltersDto } from './models/get-purches-filters.dto';
import { CreatePurchesDto } from './models/create-purches.dto';
import { UpdatePurchesDto } from './models/update-purches.dto';
import { Purches } from './entities/purches.entity';
import { PurchesesProducts } from './entities/purcheses-products.entity';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class PurchesesService {
  constructor(
    private readonly repository: PurchesesRepository,
    private readonly dataSource: DataSource,
  ) {}

  async getAll(filters: GetPurchesesFiltersDto) {
    return await this.repository.findByFilters(filters);
  }

  async findById(id: number) {
    const record = await this.repository.findOne({
      relations: ['supplier', 'purchesProducts'],
      where: { id },
    });

    if (record) throw new NotFoundException();

    return record;
  }

  async create(dto: CreatePurchesDto, componyId: number) {
    const runner = this.dataSource.createQueryRunner();
    await runner.connect();
    await runner.startTransaction();
    try {
      const newPurches = this.repository.create({ ...dto, componyId });
      const purches = await runner.manager
        .getRepository(Purches)
        .save(newPurches);

      for (let index = 0; index < dto.products.length; index++) {
        const item = dto.products[index];
        const newPurchesProduct = runner.manager
          .getRepository(PurchesesProducts)
          .create({
            ...item,
            purchesId: purches.id,
          });

        const purchesProduct = await runner.manager
          .getRepository(PurchesesProducts)
          .save(newPurchesProduct);

        const product = await runner.manager.getRepository(Product).findOne({
          where: { id: purchesProduct.productId },
        });

        product.stock += item.quantity;

        await runner.manager.getRepository(Product).save(product);
      }

      await runner.commitTransaction();
      await runner.release();

      return purches;
    } catch (error) {
      await runner.rollbackTransaction();
      await runner.release();
      throw error;
    }
  }

  async update(id: number, dto: UpdatePurchesDto) {
    const purches = await this.findById(id);

    const newPurches = this.repository.merge(purches, dto, { id });

    return await this.repository.save(newPurches);
  }

  async remove(id: number) {
    const purches = await this.findById(id);

    return await this.repository.softRemove(purches);
  }
}
