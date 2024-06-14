import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './models/create-client.dto';
import { User } from 'src/shared/decorators/user.decorator';
import { User as UserEntity } from 'src/users/entities/user.entity';
import { UpdateClientDto } from './models/update-client.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetClientsFiltersDto } from './models/get-clients-filters.dto';
import { ComponyGuard } from 'src/auth/compony.guard';

@Controller('clients')
@ApiTags("Clients")
@UseGuards(JwtAuthGuard, ComponyGuard)
@ApiBearerAuth()
export class ClientsController {

    constructor(
        private readonly service: ClientsService
    ) {}

    @ApiOkResponse()
    @ApiUnauthorizedResponse()
    @Get()
    async getAll(
        @Query() filters: GetClientsFiltersDto
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
        @Body() body: CreateClientDto,
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
        @Body() body: UpdateClientDto,
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
