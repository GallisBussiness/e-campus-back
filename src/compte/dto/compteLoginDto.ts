import { IsString } from "class-validator";

export class CompteLoginDto {
    @IsString()
    code: string;

    @IsString()
    password: string;
}