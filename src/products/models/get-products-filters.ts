import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetProductsFilters {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsNumber()
  owner_id?: number;

  @ApiProperty({ required: false })
    fromDate?: Date;
    
    @ApiProperty({ required: false })
    toDate?: Date;

  @IsOptional()
  page?: number;

  @IsOptional()
  per_page?: number;
}
