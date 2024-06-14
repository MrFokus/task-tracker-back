import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateGroupDto {
    @IsNotEmpty()
    @IsNumber()
    projectId: number;

    @IsNotEmpty()
    @IsString()
    name: string

    icon?:File
}
