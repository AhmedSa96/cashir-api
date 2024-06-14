import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JSReportService } from "./services/jsreport.service";

@Module({
    imports: [
        ConfigModule,
    ],
    providers: [JSReportService],
    exports: [
        JSReportService
    ]
})
export class SharedModule {}