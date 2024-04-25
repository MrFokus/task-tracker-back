import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MinLength } from "class-validator";

export class CreateUserDto {
    
    @IsString()
    login: string;

    @IsString()
    @MinLength(8)
    password: string;

    @IsString()
    name: string;

    @IsNotEmpty()
    mail: string;
}
