import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SystemConstantsService } from './system-constants.service';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { GetConstantsFilters } from './models/get-constants-filters.dto';
import { CreateConstantDto } from './models/create-constant.dto';
import { UpdateConstantDto } from './models/update-constant.dto';
import { SystemConstantsResource } from './models/system-constants.resource';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AdminGuard } from 'src/auth/admin.guard';

@ApiTags('System Constants')
@Controller('system-constants')
@UseGuards(JwtAuthGuard, AdminGuard)
export class SystemConstantsController {
  constructor(private readonly service: SystemConstantsService) {}

  @ApiOkResponse({ type: [SystemConstantsResource] })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBearerAuth()
  @Get()
  public async getAll(@Query() filters?: GetConstantsFilters) {
    return await this.service.getAll(filters);
  }

  @ApiOkResponse()
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBearerAuth()
  @Get('/:id')
  public async findOneById(@Param('id', ParseIntPipe) id: number) {
    return await this.service.findOneById(+id);
  }

  @ApiOkResponse()
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBearerAuth()
  @Post()
  public async create(@Body() dto: CreateConstantDto) {
    return await this.service.create(dto);
  }

  @ApiOkResponse()
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBearerAuth()
  @Patch('/:id')
  public async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateConstantDto,
  ) {
    return await this.service.update(+id, dto);
  }

  @ApiOkResponse()
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBearerAuth()
  @Delete('/:id')
  public async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.service.remove(+id);
  }
}
