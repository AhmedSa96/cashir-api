import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class CreateComponyDto {

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

  @ApiProperty({ required: false, description: 'password is required for create, dont send for update' })
  password?: string;
}