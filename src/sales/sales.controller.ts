import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { SalesService } from './sales.service';
import { GetSalesFiltersDto } from './models/get-sales-filters.dto';
import { CreateSaleDto } from './models/create-sale.dto';
import { User } from 'src/shared/decorators/user.decorator';
import { User as UserEntity } from 'src/users/entities/user.entity';
import { UpdateSaleDto } from './models/update-sale.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ComponyGuard } from 'src/auth/compony.guard';

@Controller('sales')
@ApiTags("Sales")
@UseGuards(JwtAuthGuard, ComponyGuard)
@ApiBearerAuth()
export class SalesController {

    constructor(
        private readonly service: SalesService
    ) {}

    @ApiOkResponse()
    @ApiUnauthorizedResponse()
    @Get()
    async getAll(
        @Query() filters: GetSalesFiltersDto
    ) {
        return await this.service.getAll(filters);
    }

    @ApiOkResponse()
    @ApiUnauthorizedResponse()
    @Post()
    async create(
        @Body() body: CreateSaleDto,
        @User() user: UserEntity
    ) {
        return await this.service.create(body, user.id);
    }

    @ApiOkResponse()
    @ApiUnauthorizedResponse()
    @Get(":id")
    async findById(
        @Param("id", ParseIntPipe) id: number,
    ) {
        return await this.service.findById(id);
    }

    @ApiOkResponse()
    @ApiUnauthorizedResponse()
    @Patch(":id")
    async update(
        @Param("id", ParseIntPipe) id: number,
        @Body() body: UpdateSaleDto
    ) {
        return await this.service.update(id, body);
    }

    @ApiOkResponse()
    @ApiUnauthorizedResponse()
    @Delete(":id")
    async remove(
        @Param("id", ParseIntPipe) id: number,
    ) {
        return await this.service.remove(id);
    }

}
