import { IsNotEmpty, IsString } from "class-validator";

export class AuthDto{

    @IsString()
    @IsNotEmpty()
    login: string;

    @IsNotEmpty()
    password: string;
}