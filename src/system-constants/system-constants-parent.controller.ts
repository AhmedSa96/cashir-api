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
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { SystemConstantsParentService } from './system-constants-parent.service';
import { SystemConstantsParentsResource } from './models/system-constants-parents.resource';
import { GetParentsFilters } from './models/get-parents-filters.dto';
import { CreateParentDto } from './models/create-parent.dto';
import { UpdateParentDto } from './models/update-constant-parent.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AdminGuard } from 'src/auth/admin.guard';

@ApiTags('System Constants')
@Controller('system-constants/parent')
@UseGuards(JwtAuthGuard, AdminGuard)
export class SystemConstantsParentController {
  constructor(private readonly service: SystemConstantsParentService) {}

  @ApiOkResponse({ type: [SystemConstantsParentsResource] })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBearerAuth()
  @Get()
  public async getAll(@Query() filters?: GetParentsFilters) {
    return await this.service.getAll(filters);
  }

  @ApiOkResponse()
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBearerAuth()
  @Get('/:id')
  public async findOneById(@Param('id', ParseIntPipe) id: number) {
    return await this.service.findOneById(id);
  }

  @ApiOkResponse()
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBearerAuth()
  @Post()
  public async create(@Body() dto: CreateParentDto) {
    return await this.service.create(dto);
  }

  @ApiOkResponse()
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBearerAuth()
  @Patch('/:id')
  public async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateParentDto,
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
