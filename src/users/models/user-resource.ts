import { Exclude } from 'class-transformer';
import { ApiProperty } from "@nestjs/swagger";
import { IsEnum } from "class-validator";
import { UserType } from "../entities/user.entity";

export class UserResource {
    @ApiProperty({ example: 1 })
    id: number = 0;

    @ApiProperty({ example: 'John' })
    name: string = '';

    @ApiProperty({ example: 'user@gmail.com'})
    email: string = '';

    @ApiProperty({ enum: UserType, default: UserType.COMPONY })
    @IsEnum(UserType, { message: 'user type is not valid' })
    user_type: UserType = UserType.COMPONY;

    @ApiProperty()
    createdAt: Date = new Date();

    @ApiProperty()
    updatedAt: Date = new Date();

    @Exclude()
    password?: string;

    @Exclude()
    deletedAt?: Date;
}