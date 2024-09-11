import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional } from 'class-validator';

export class LoginDto {
    @ApiProperty({ example: 'johndoe', description: 'The username of the user', required: false })
    @IsString()
    @IsOptional()
    username?: string;

    @ApiProperty({
        example: 'user@example.com',
        description: 'The email of the user',
        required: false,
    })
    @IsEmail()
    @IsOptional()
    email?: string;

    @ApiProperty({ example: 'password123', description: 'The password of the user' })
    @IsString()
    password: string;
}
