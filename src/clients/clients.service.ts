import { Injectable, NotFoundException } from '@nestjs/common';
import { ClientRepository } from './client.repository';
import { Like } from 'typeorm';
import { UpdateClientDto } from './models/update-client.dto';
import { CreateClientDto } from './models/create-client.dto';
import { GetClientsFiltersDto } from './models/get-clients-filters.dto';

@Injectable()
export class ClientsService {

    constructor(
        private readonly repository: ClientRepository
    ) {}

    async getAll(filters: GetClientsFiltersDto) {
        return await this.repository.findByFilters(filters);
    }

    async search(searchKey: string) {
        return await this.repository.find({ where: { name: Like(`${searchKey}%`) }, select: ["id", "name"] });
    }

    async findById(id: number) {
        const client = await this.repository.findOne({ where: { id } });

        if (!client) throw new NotFoundException(`client with id #${id} is not found`);

        return client;
    }

    async create(dto: CreateClientDto, userId: number) {
        const client = this.repository.create({ ...dto, userId });

        return await this.repository.save(client);
    }

    async update(id: number, dto: UpdateClientDto) {
        const client = await this.findById(id);

        const newClient = this.repository.merge(client, dto, { id });

        return await this.repository.save(newClient);
    }

    async remove(id: number) {
        const client = await this.findById(id);

        return await this.repository.softRemove(client);
    }
}
