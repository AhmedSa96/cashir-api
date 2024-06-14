import { ApiProperty } from "@nestjs/swagger";

export class GetConstantsFilters {

    @ApiProperty({ required: false })
    parentId?: number;

    @ApiProperty({ required: false })
    name?: string;
}