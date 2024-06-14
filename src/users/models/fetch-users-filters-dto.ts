import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsEnum } from 'class-validator';
import { UserType } from './../entities/user.entity';

export class FetchUsersFiltersDto {
    
    @ApiProperty({ required: false, default: 1 })
    @IsNumber({ allowNaN: false, allowInfinity: false }, { message: 'page must be a number' })
    @Type(() => Number)
    page: number = 1;

    @ApiProperty({ required: false, default: 10 })
    @IsNumber({ allowNaN: false, allowInfinity: false }, { message: 'limit must be a number' })
    @Type(() => Number)
    limit: number = 10;
    
    @ApiProperty({ required: false, enum: UserType, default: UserType.COMPONY })
    @IsEnum(UserType)
    user_type: UserType = UserType.COMPONY;

}
