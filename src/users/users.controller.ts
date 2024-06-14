import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { UpdateUserDto } from './models/update-user-dto';
import { UserResource } from './models/user-resource';
import { CreateUserDto } from './models/create-user-dto';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { FetchUsersFiltersDto } from './models/fetch-users-filters-dto';
import { AdminGuard } from '../auth/admin.guard';
import { User as UserModel } from './entities/user.entity';
import { CurrentAuthUser } from '../auth/models/current-auth-user';
import { User } from '../shared/decorators/user.decorator';

@ApiTags('Users')
@Controller('users')
@UseGuards(JwtAuthGuard, AdminGuard)
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOkResponse({ type: [UserModel] })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async findAll(
    @Query() filters: FetchUsersFiltersDto,
  ) {
    return await this.usersService.findAll(filters);
  }

  @Get("orders")
  @ApiOkResponse()
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async findOrders(
    @User() user: CurrentAuthUser,
  ) {
    return await this.usersService.findOrdersByUserId(user.id);
  }

  @Get(":id")
  @ApiOkResponse({ type: UserResource })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Not found', schema: { example: { statusCode: 404, message: 'Not found' } }})
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserResource> {
    return await this.usersService.findOne(id);
  }
  
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post()
  @ApiCreatedResponse({ type: UserResource })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async create(
    @Body() user: CreateUserDto,
  ): Promise<UserResource> {
    return await this.usersService.create(user);
  }

  @Put()
  @ApiOkResponse({ type: UserResource })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async update(
    @Body() user: UpdateUserDto,
  ): Promise<UserResource> {
    return await this.usersService.update(user);
  }

  @Delete(":id")
  @ApiOkResponse({ type: UserResource })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserResource> {
    return await this.usersService.delete(id);
  }

  @Post("favorite/:productId")
  @ApiOkResponse({ type: UserResource })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async addFavorite(
    @User() user: CurrentAuthUser,
    @Param("productId") productId: number,
  ) {
    return await this.usersService.addProductToFavorites(user.id, productId);
  }
}
