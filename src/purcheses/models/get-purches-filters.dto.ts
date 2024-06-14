import { ApiProperty } from "@nestjs/swagger";
import { IsDate } from "class-validator";
import { DEFAULT_PAGE, DEFAULT_PER_PAGE } from "src/shared/utils/paginate";

export class GetPurchesesFiltersDto {

    @ApiProperty({ required: false })
    idLike?: number | string;

    @ApiProperty({ required: false })
    fromDate?: Date;
    
    @ApiProperty({ required: false })
    toDate?: Date;

    @ApiProperty({ required: false })
    page: number = DEFAULT_PAGE;

    @ApiProperty({ required: false })
    perPage: number = DEFAULT_PER_PAGE;

}