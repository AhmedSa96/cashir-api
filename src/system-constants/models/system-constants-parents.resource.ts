import { ApiProperty } from "@nestjs/swagger";

class SystemConstantsResource {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;
}

export class SystemConstantsParentsResource {

    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    constants: SystemConstantsResource[];

}

