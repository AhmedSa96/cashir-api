import { ApiProperty } from "@nestjs/swagger";

export class CreateSupplierReceiptDto {

    @ApiProperty()
    notes: string;
    
    @ApiProperty()
    paymentDate: Date;

    @ApiProperty()
    amount: number;

    @ApiProperty()
    supplierId: number;
    
}