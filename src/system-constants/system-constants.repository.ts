import { Injectable } from "@nestjs/common";
import { DataSource, Like, Repository } from "typeorm";
import { SystemConstants } from "./entities/system-constants.entity";
import { GetConstantsFilters } from "./models/get-constants-filters.dto";

@Injectable()
export class SystemConstantsRepository extends Repository<SystemConstants> {

    constructor(datasource: DataSource) {
        super(SystemConstants, datasource.createEntityManager());
    }

    public async getAll(filters: GetConstantsFilters) {
        const query = this.createQueryBuilder()
            .leftJoinAndSelect("SystemConstantsParent", "parent", "parent.id = SystemConstants.parentId");

        if (filters.parentId) 
            query.andWhere({ parentId: filters.parentId });

        if (filters.name)
            query.andWhere({ name: Like(`${filters.name}%`) })

        return await query.getMany()
    }
}