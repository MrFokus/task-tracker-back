import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateMarkDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    color: string
    
    @IsNotEmpty()
    @IsString()
    background: string

    @IsNotEmpty()
    @IsNumber()
    projectId: number
    

}
