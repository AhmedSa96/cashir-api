import { Injectable, NotFoundException } from '@nestjs/common';
import { GetConstantsFilters } from './models/get-constants-filters.dto';
import { CreateParentDto } from './models/create-parent.dto';
import { UpdateParentDto } from './models/update-constant-parent.dto';
import { SystemConstantsParentRepository } from './system-constants-parent.repository';

@Injectable()
export class SystemConstantsParentService {

    constructor(
        private readonly repository: SystemConstantsParentRepository
    ) {}

    public async getAll(filters: GetConstantsFilters) {
        return await this.repository.getAll(filters);
    }

    public async findOneById(id: number) {
        const constant = await this.repository.findOne({ relations: ["constants"], where: { id } });
        
        if (!constant) throw new NotFoundException(`constant parent with id #${id} is not found`);

        return constant;
    }

    public async create(dto: CreateParentDto) {
        let newRecourd = this.repository.create(dto);
        return await this.repository.save(newRecourd);
    }

    public async update(id: number, dto: UpdateParentDto) {
        const newRecoud = this.repository.merge(await this.findOneById(id), dto, { id });
        
        return await this.repository.save(newRecoud);
    }

    public async remove(id: number) {
        return await this.repository.softDelete({ id });
    }

    public async findOneByName(name: string) {
        return await this.repository.findOne({ relations: ["constants"], where: { name } });
    }
}
