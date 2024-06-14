import { Injectable, NotFoundException } from '@nestjs/common';
import { SupplierRepository } from './supplier.repository';
import { Like } from 'typeorm';
import { CreateSupplierDto } from './models/create-supplier.dto';
import { UpdateSupplierDto } from './models/update-supplier.dto';
import { GetSuppliersFilters } from './models/get-suppliers-filters.dto';

@Injectable()
export class SuppliersService {

    constructor(
        private readonly repository: SupplierRepository
    ) {}

    async getAll(filters: GetSuppliersFilters) {
        return await this.repository.findByFilters(filters);
    }

    async search(searchKey: string) {
        return await this.repository.find({ where: { name: Like(`${searchKey}%`) }, select: ["id", "name"] });
    }

    async findById(id: number) {
        const supplier = await this.repository.findOne({ where: { id } });

        if (!supplier) throw new NotFoundException(`supplier with id #${id} is not found`);

        return supplier;
    }

    async create(dto: CreateSupplierDto, userId: number) {
        const supplier = this.repository.create({ ...dto, userId });

        return await this.repository.save(supplier);
    }

    async update(id: number, dto: UpdateSupplierDto) {
        const supplier = await this.findById(id);

        const newSupplier = this.repository.merge(supplier, dto, { id });

        return await this.repository.save(newSupplier);
    }

    async remove(id: number) {
        const supplier = await this.findById(id);

        return await this.repository.softRemove(supplier);
    }
}
