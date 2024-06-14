import { ApiProperty } from "@nestjs/swagger";

export class GetClientReceiptsFiltersDto {

    @ApiProperty({ required: false })
    clientId: number;

    @ApiProperty({ required: false })
    fromDate?: Date;
    
    @ApiProperty({ required: false })
    toDate?: Date;

    @ApiProperty({ required: false })
    page: number;
    
    @ApiProperty({ required: false })
    perPage: number;

}