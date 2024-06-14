import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { SupplierReceiptService } from './services/supplier-receipt/supplier-receipt.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { GetSupplierReceiptsFiltersDto } from './models/get-supplier-receipts-filters.dto';
import { CreateSupplierReceiptDto } from './models/create-supplier-receipt.dto';
import { User } from 'src/shared/decorators/user.decorator';
import { User as UserEntity } from 'src/users/entities/user.entity';
import { UpdateSupplierReceiptDto } from './models/update-supplier-receipt.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ComponyGuard } from 'src/auth/compony.guard';

@Controller('supplier-receipt')
@ApiTags("Suppliers Receipts")
@UseGuards(JwtAuthGuard, ComponyGuard)
@ApiBearerAuth()
export class SupplierReceiptController {

    constructor(
        private readonly service: SupplierReceiptService
    ) {}

    @ApiOkResponse()
    @ApiUnauthorizedResponse()
    @Get()
    async getAll(
        @Query() filters: GetSupplierReceiptsFiltersDto
    ) {
        return await this.service.getAll(filters);
    }

    @ApiOkResponse()
    @ApiUnauthorizedResponse()
    @Post()
    async create(
        @Body() body: CreateSupplierReceiptDto,
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
        @Body() body: UpdateSupplierReceiptDto,
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
