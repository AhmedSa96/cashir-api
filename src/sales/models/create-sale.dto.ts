import { ApiProperty } from "@nestjs/swagger";
import { IsEmpty, IsNotEmpty, IsNumber } from "class-validator";

class SaleProductDto {

    @ApiProperty()
    @IsNotEmpty()
    productId: number;

    @ApiProperty()
    @IsNotEmpty()
    quantity: number;

    @ApiProperty()
    @IsNotEmpty()
    price: number;

    @ApiProperty()
    @IsNotEmpty()
    totalPrice: number;
}

export class CreateSaleDto {

    @ApiProperty()
    // @IsNumber()
    clientId?: number;

    @ApiProperty({ nullable: true, default: 0 })
    paymentAmount: number = 0;

    @ApiProperty()
    notes?: string;

    @ApiProperty({ type: [SaleProductDto] })
    products: SaleProductDto[];
}