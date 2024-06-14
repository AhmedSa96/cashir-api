import { ApiProperty } from "@nestjs/swagger";

export class CreateConstantDto {

    @ApiProperty()
    name: string;

    @ApiProperty()
    parentId: number;
}