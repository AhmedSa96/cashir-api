import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { PurchesesService } from './purcheses.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { GetPurchesesFiltersDto } from './models/get-purches-filters.dto';
import { CreatePurchesDto } from './models/create-purches.dto';
import { User } from 'src/shared/decorators/user.decorator';
import { User as UserEntity } from 'src/users/entities/user.entity';
import { UpdatePurchesDto } from './models/update-purches.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ComponyGuard } from 'src/auth/compony.guard';

@Controller('purcheses')
@ApiTags("Purcheses")
@UseGuards(JwtAuthGuard, ComponyGuard)
@ApiBearerAuth()
export class PurchesesController {

    constructor(
        private readonly service: PurchesesService
    ) {}

    @ApiOkResponse()
    @ApiUnauthorizedResponse()
    @Get()
    async getAll(
        @Query() filters: GetPurchesesFiltersDto
    ) {
        return await this.service.getAll(filters);
    }

    @ApiOkResponse()
    @ApiUnauthorizedResponse()
    @Post()
    async create(
        @Body() body: CreatePurchesDto,
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
        @Body() body: UpdatePurchesDto
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
