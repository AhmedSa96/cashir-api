import { ApiProperty } from "@nestjs/swagger";

export class CreateClientReceiptDto {

    @ApiProperty()
    notes?: string;
    
    @ApiProperty()
    paymentDate: Date;

    @ApiProperty()
    amount: number;

    @ApiProperty()
    clientId: number;
    
}