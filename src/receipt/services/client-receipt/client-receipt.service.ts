import { Injectable, NotFoundException } from '@nestjs/common';
import { ClientReceiptsRepository } from 'src/receipt/client-receipts.repository';
import { CreateClientReceiptDto } from 'src/receipt/models/create-client-receipt.dto';
import { GetClientReceiptsFiltersDto } from 'src/receipt/models/get-client-receipts-filters.dto';
import { UpdateClientReceiptDto } from 'src/receipt/models/update-client-receipt.dto';

@Injectable()
export class ClientReceiptService {

    constructor(
        private readonly repository: ClientReceiptsRepository
    ) {}

    async getAll(filters: GetClientReceiptsFiltersDto) {
        return await this.repository.findByFilters(filters);
    }

    async create(dto: CreateClientReceiptDto, componyId: number) {
        const newReceipt = this.repository.create({...dto, componyId });

        return await this.repository.save(newReceipt);
    }

    async findById(id: number) {
        const receipt = await this.repository.findOne({ where: { id } });

        if (!receipt) throw new NotFoundException();

        return receipt;
    }

    async update(id: number, dto: UpdateClientReceiptDto) {
        const oldReceipt = await this.findById(id);

        const newReceipt = this.repository.merge(oldReceipt, dto, { id });

        return await this.repository.save(newReceipt);
    }

    async remove(id: number) {
        const receipt = await this.findById(id);
        
        return await this.repository.softRemove(receipt);
    }
}
