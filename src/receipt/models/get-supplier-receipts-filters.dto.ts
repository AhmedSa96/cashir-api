import { ApiProperty } from "@nestjs/swagger";

export class GetSupplierReceiptsFiltersDto {

    @ApiProperty({ required: false })
    supplierId: number;

    @ApiProperty({ required: false })
    fromDate?: Date;
    
    @ApiProperty({ required: false })
    toDate?: Date;

    @ApiProperty({ required: false })
    page: number;
    
    @ApiProperty({ required: false })
    perPage: number;

}