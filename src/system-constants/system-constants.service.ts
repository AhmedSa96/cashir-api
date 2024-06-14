import { Injectable, NotFoundException } from '@nestjs/common';
import { SystemConstantsRepository } from './system-constants.repository';
import { GetConstantsFilters } from './models/get-constants-filters.dto';
import { CreateConstantDto } from './models/create-constant.dto';
import { UpdateConstantDto } from './models/update-constant.dto';

@Injectable()
export class SystemConstantsService {

    constructor(
        private readonly repository: SystemConstantsRepository
    ) {}

    public async getAll(filters: GetConstantsFilters) {
        return await this.repository.getAll(filters);
    }

    public async findOneById(id: number) {
        const constant = await this.repository.findOne({ relations: ["parent"], where: { id } });
        
        if (!constant) throw new NotFoundException(`constant with id #${id} is not found`);

        return constant;
    }

    public async create(dto: CreateConstantDto) {
        let newRecourd = this.repository.create(dto);
        return await this.repository.save(newRecourd);
    }

    public async update(id: number, dto: UpdateConstantDto) {
        const newRecoud = this.repository.merge(await this.findOneById(id), dto, { id });
        
        return await this.repository.save(newRecoud);
    }

    public async remove(id: number) {
        return await this.repository.softDelete({ id });
    }
}
