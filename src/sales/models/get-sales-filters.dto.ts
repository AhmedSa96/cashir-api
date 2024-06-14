import { ApiProperty } from "@nestjs/swagger";
// import { IsDate, Allow } from "class-validator";
import { DEFAULT_PAGE, DEFAULT_PER_PAGE } from "src/shared/utils/paginate";

export class GetSalesFiltersDto {

    @ApiProperty({ required: false })
    idLike?: number;

    @ApiProperty({ required: false })
    // @IsDate()
    fromDate?: Date;
    
    @ApiProperty({ required: false })
    // @IsDate()
    toDate?: Date;

    @ApiProperty({ required: false })
    page: number = DEFAULT_PAGE;

    @ApiProperty({ required: false })
    perPage: number = DEFAULT_PER_PAGE;

}