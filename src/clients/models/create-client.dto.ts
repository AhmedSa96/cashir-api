import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MinLength } from "class-validator";

export class CreateClientDto {

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(2)
    name: string;

    @ApiProperty()
    phone: string;

    @ApiProperty()
    address: string;
    
    @ApiProperty({ default: 0 })
    prevAmount: number = 0;
}