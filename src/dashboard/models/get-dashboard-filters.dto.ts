import { ApiProperty } from "@nestjs/swagger";
import { Moment } from "moment";

export class GetDashboardFilters {

    @ApiProperty({ required: false })
    fromDate?: Date;
    
    @ApiProperty({ required: false })
    toDate?: Date;

    userId: number;
}