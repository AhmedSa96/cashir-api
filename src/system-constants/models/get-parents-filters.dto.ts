import { ApiProperty } from "@nestjs/swagger";

export class GetParentsFilters {

    @ApiProperty({ required: false })
    name?: string;
    
}