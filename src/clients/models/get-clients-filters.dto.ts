import { ApiProperty } from "@nestjs/swagger";

export class GetClientsFiltersDto {

    @ApiProperty({ required: false })
    search?: string;
    
    @ApiProperty({ required: false })
    fromDate?: Date;
    
    @ApiProperty({ required: false })
    toDate?: Date;

    @ApiProperty({ required: false })
    page: number;

    @ApiProperty({ required: false })
    perPage: number;

}