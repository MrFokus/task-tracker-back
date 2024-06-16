import { IsNotEmpty } from "class-validator";

export class CreateTaskDto {
    @IsNotEmpty()
    name: string;
    description: string;
    @IsNotEmpty()
    projectId: number;
    @IsNotEmpty()
    groupId: number;
    dateEnd: string;
    @IsNotEmpty()
    label: string;
    marks?: {id:number,name:string}[];
    participants?: {id:number,name:string}[];
    checkList: {id?:number,name:string,status:boolean}[];
    attachment:unknown[]
    
}
