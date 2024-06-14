import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report, ReportCategory } from './entities/report.entity';
import { ReportsService } from './reports.service';
import { ReportsRepository } from './reports.repository';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [
    SharedModule,
    HttpModule, 
    TypeOrmModule.forFeature([Report, ReportCategory]),
  ],
  controllers: [ReportsController],
  providers: [ReportsService, ReportsRepository],
})
export class ReportsModule {}
