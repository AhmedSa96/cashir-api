import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

class PurchesProductDto {

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

export class CreatePurchesDto {

    @ApiProperty()
    // @IsNumber()
    supplierId?: number;

    @ApiProperty()
    notes?: string;

    @ApiProperty({ type: [PurchesProductDto] })
    products: PurchesProductDto[];
}