import { IsString } from "class-validator";

export class CompteUpdatePassDto {
    @IsString()
    oldPass: string;

    @IsString()
    password: string;
}