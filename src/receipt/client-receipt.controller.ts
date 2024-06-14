import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ClientReceiptService } from './services/client-receipt/client-receipt.service';
import { GetClientReceiptsFiltersDto } from './models/get-client-receipts-filters.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { CreateClientReceiptDto } from './models/create-client-receipt.dto';
import { User } from 'src/shared/decorators/user.decorator';
import { User as UserEntity } from 'src/users/entities/user.entity';
import { UpdateClientReceiptDto } from './models/update-client-receipt.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ComponyGuard } from 'src/auth/compony.guard';

@Controller('client-receipt')
@ApiTags("Clients Receipts")
@UseGuards(JwtAuthGuard, ComponyGuard)
@ApiBearerAuth()
export class ClientReceiptController {

    constructor(
        private readonly service: ClientReceiptService
    ) {}

    @ApiOkResponse()
    @ApiUnauthorizedResponse()
    @Get()
    async getAll(
        @Query() filters: GetClientReceiptsFiltersDto
    ) {
        return await this.service.getAll(filters);
    }

    @ApiOkResponse()
    @ApiUnauthorizedResponse()
    @Post()
    async create(
        @Body() body: CreateClientReceiptDto,
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
        @Body() body: UpdateClientReceiptDto,
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
