import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSupplierReceiptDto } from 'src/receipt/models/create-supplier-receipt.dto';
import { GetSupplierReceiptsFiltersDto } from 'src/receipt/models/get-supplier-receipts-filters.dto';
import { UpdateSupplierReceiptDto } from 'src/receipt/models/update-supplier-receipt.dto';
import { SupplierReceiptsRepository } from 'src/receipt/supplier-receipts.repository';

@Injectable()
export class SupplierReceiptService {

    constructor(
        private readonly repository: SupplierReceiptsRepository
    ) {}

    async getAll(filters: GetSupplierReceiptsFiltersDto) {
        return await this.repository.findByFilters(filters);
    }

    async create(dto: CreateSupplierReceiptDto, componyId: number) {
        const newReceipt = this.repository.create({...dto, componyId });

        return await this.repository.save(newReceipt);
    }

    async findById(id: number) {
        const receipt = await this.repository.findOne({ where: { id } });

        if (!receipt) throw new NotFoundException();

        return receipt;
    }

    async update(id: number, dto: UpdateSupplierReceiptDto) {
        const oldReceipt = await this.findById(id);

        const newReceipt = this.repository.merge(oldReceipt, dto, { id });

        return await this.repository.save(newReceipt);
    }

    async remove(id: number) {
        const receipt = await this.findById(id);
        
        return await this.repository.softRemove(receipt);
    }
}
