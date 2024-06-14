import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { CreateSupplierDto } from './models/create-supplier.dto';
import { User } from 'src/shared/decorators/user.decorator';
import { User as UserEntity } from 'src/users/entities/user.entity';
import { UpdateSupplierDto } from './models/update-supplier.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ComponyGuard } from 'src/auth/compony.guard';
import { GetSuppliersFilters } from './models/get-suppliers-filters.dto';

@Controller('suppliers')
@ApiTags("Suppliers")
@UseGuards(JwtAuthGuard, ComponyGuard)
@ApiBearerAuth()
export class SuppliersController {

    constructor(
        private readonly service: SuppliersService
    ) {}

    @ApiOkResponse()
    @ApiUnauthorizedResponse()
    @Get()
    async getAll(
        @Query() filters: GetSuppliersFilters
    ) {
        return await this.service.getAll(filters);
    }

    @ApiOkResponse()
    @ApiUnauthorizedResponse()
    @Get("/search")
    async search(@Query("name") name: string) {
        return await this.service.search(name);
    }

    @ApiOkResponse()
    @ApiUnauthorizedResponse()
    @Post()
    async create(
        @Body() body: CreateSupplierDto,
        @User() user: UserEntity
    ) {
        return await this.service.create(body, user.id)
    }

    @ApiOkResponse()
    @ApiUnauthorizedResponse()
    @Get("/:id")
    async getById(
        @Param("id", ParseIntPipe) id: number
    ) {
        return await this.service.findById(id);
    }

    @ApiOkResponse()
    @ApiUnauthorizedResponse()
    @Patch("/:id")
    async update(
        @Param("id", ParseIntPipe) id: number,
        @Body() body: UpdateSupplierDto,
    ) {
        return await this.service.update(id, body);
    }

    @ApiOkResponse()
    @ApiUnauthorizedResponse()
    @Delete("/:id")
    async remove(
        @Param("id", ParseIntPipe) id: number,
    ) {
        return await this.service.remove(id);
    }
}
