import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { SalePurchesType } from "../entities/product.entity";

export class CreateProductDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty()
    @IsNotEmpty()
    // @IsNumber()
    quantity: number;
    
    @ApiProperty()
    @IsNotEmpty()
    // @IsNumber()
    price: number;
    
    @ApiProperty({ enum: SalePurchesType, default: SalePurchesType.BOX })
    salePurchesType: SalePurchesType = SalePurchesType.BOX;

    @ApiProperty()
    @IsNotEmpty()
    // @IsNumber()
    changeQuantityValue: number;

    @ApiProperty({ required: false })
    barcode?: string;

    @ApiProperty({ format: 'binary' })
    images: string[];
}