import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';
import { GetDashboardFilters } from './models/get-dashboard-filters.dto';
import { User } from 'src/shared/decorators/user.decorator';
import { User as UserEntity } from 'src/users/entities/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ComponyGuard } from 'src/auth/compony.guard';

@Controller('dashboard')
@ApiTags('Dashboard')
@UseGuards(JwtAuthGuard, ComponyGuard)
@ApiBearerAuth()
export class DashboardController {
  constructor(private readonly service: DashboardService) {}

  @ApiOkResponse()
  @Get()
  public async get(
    @Query() filters: GetDashboardFilters,
    @User() user: UserEntity,
  ) {
    return await this.service.getData({ ...filters, userId: user.id });
  }
}
