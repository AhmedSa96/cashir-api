import { ApiProperty } from "@nestjs/swagger";

class SystemConstantsResourceParent {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;
}

export class SystemConstantsResource {

    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    parent: SystemConstantsResourceParent
}

