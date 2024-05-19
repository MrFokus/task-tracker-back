import { ArrayNotEmpty, IsArray, IsEmpty, IsJSON, IsNotEmpty, IsNotEmptyObject, IsOptional, IsString, MinLength } from "class-validator";

export class CreateTeamDto {

    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsOptional()
    photo?: string

    @IsArray()
    @ArrayNotEmpty()
    participates: {
        id: number, role: number
    }[]

}
