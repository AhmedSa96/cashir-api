import { ApiProperty } from "@nestjs/swagger";

export class CreateParentDto {

    @ApiProperty()
    name: string;

}