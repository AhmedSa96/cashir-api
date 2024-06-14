import { Injectable, NotFoundException } from '@nestjs/common';
import { ReportsRepository } from './reports.repository';

import { JSReportService } from 'src/shared/services/jsreport.service';

@Injectable()
export class ReportsService {
  constructor(
    private readonly repository: ReportsRepository,
    private readonly jsReportService: JSReportService,
  ) {}

  async getAll() {
    return await this.repository.find();
  }

  async getOne(id: number) {
    const item = await this.repository.findOne({ where: { id } });

    if (!item) throw new NotFoundException(`report with id #${id} not found`);

    return item;
  }

  async getFile(id: number, data: any) {
    const report = await this.getOne(id);
    const fileResponse = await this.jsReportService.buildFile(report, {report, ...data});

    return { report, fileResponse };
  }
}
