import { Injectable } from '@nestjs/common';
import { Report } from '../../reports/entities/report.entity';
import JSReportClient from 'jsreport-client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JSReportService {
  constructor(private readonly config: ConfigService) {}

  async buildFile(report: Report, data: unknown) {
    const host = this.config.get('REPORT_SERVER_HOST');
    const user = this.config.get('REPORT_SERVER_USER');
    const password = this.config.get('REPORT_SERVER_PASSWORD');

    const client = JSReportClient(host, user, password);

    let response = await client.render({
      template: {
        name: report.reportServerName,
        engine: report.engine, // 'handlebars',
        recipe: report.fileType, // 'chrome-pdf',
      },
      data,
      options: {
        // timeout: 60000,
      },
    });

    return response;
  }
}
