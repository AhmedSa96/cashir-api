import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { UserType } from '../entities/user.entity';

export class UpdateUserDto {

    @ApiProperty()
    @IsNotEmpty({ message: 'id is required' })
    id: number;

    @ApiProperty()
    @IsNotEmpty({ message: 'name is required' })
    name: string;
  
    @ApiProperty()
    @IsNotEmpty({ message: 'email is required' })
    @IsEmail({ }, { message: 'email is not valid' })
    email: string;
  
    @ApiProperty()
    @MinLength(9, { message: 'phone number must be at least 9 digits' })
    @MaxLength(12, { message: 'phone number must be at most 12 digits' })
    phone: string;
  
    @ApiProperty({ enum: UserType, default: UserType.COMPONY })
    @IsNotEmpty({ message: 'user type is required' })
    @IsEnum(UserType, { message: 'user type is not valid' })
    user_type: UserType;
}