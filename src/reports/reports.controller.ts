import { HttpService } from '@nestjs/axios';
import { Body, Controller, Get, Param, ParseIntPipe, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';

import { ReportsService } from './reports.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Token } from '../shared/decorators/token.decorator';

@Controller('reports')
@UseGuards(JwtAuthGuard)
@ApiTags("Reports")
@ApiBearerAuth()
export class ReportsController {
  // TODO: remove http client package
  constructor(private readonly http: HttpService, private readonly service: ReportsService) {}


  @ApiOkResponse()
  @Get()
  async getReports() {
    return await this.service.getAll()
  }

  @ApiOkResponse()
  @Get(":id")
  async getReportById(
    @Param("id", ParseIntPipe) id: number
  ) {
    return await this.service.getOne(id);
  }
  
  @ApiOkResponse()
  @Post(":id/file")
  async getReportFileById(
    @Param("id", ParseIntPipe) id: number,
    @Body("data") data: any,
    @Res() res: Response,
    @Token() accessToken: string
  ) {
    const { report, fileResponse } = await this.service.getFile(id, { ...data, accessToken } || { accessToken });

    res.set({
      'Content-Type': report.fileTypeHeader,
    });

    return fileResponse.pipe(res);
  }
}
