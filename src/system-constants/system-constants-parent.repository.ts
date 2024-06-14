import { Injectable } from "@nestjs/common";
import { DataSource, Like, Repository } from "typeorm";
import { GetConstantsFilters } from "./models/get-constants-filters.dto";
import { SystemConstantsParent } from "./entities/system-constants-parent.entity";

@Injectable()
export class SystemConstantsParentRepository extends Repository<SystemConstantsParent> {

    constructor(datasource: DataSource) {
        super(SystemConstantsParent, datasource.createEntityManager());
    }

    public async getAll(filters: GetConstantsFilters) {
        const query = this.createQueryBuilder("parent")
            .leftJoinAndSelect("parent.constants", "constants");

        if (filters.name)
            query.andWhere({ name: Like(`${filters.name}%`) });

        
        return await query.getMany();
        // return await this.find({
        //     relations: ["constants"],
        //     where: {
        //         name: filters.name ? Like(`${filters.name}%`) : undefined
        //     }
        // });
    }
}