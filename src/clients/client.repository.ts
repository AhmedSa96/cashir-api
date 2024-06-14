import { Injectable } from "@nestjs/common";
import { DataSource, Like, Repository } from "typeorm";
import { Client } from "./entities/client.entity";
import { GetClientsFiltersDto } from "./models/get-clients-filters.dto";

@Injectable()
export class ClientRepository extends Repository<Client> {

    constructor(dataSource: DataSource) {
        super(Client, dataSource.createEntityManager());
    }

    async findByFilters(filters: GetClientsFiltersDto) {
        const query = this.createQueryBuilder("clients");

        if (filters.search) query.andWhere({ name: Like(`${filters.search}%`) })

        if (filters.fromDate) query.andWhere('"createdAt" >= :fromDate', { fromDate: filters.fromDate });

        if (filters.toDate) query.andWhere('"createdAt" <= :toDate', { toDate: filters.toDate });

        return query.paginate(filters);
    }
}