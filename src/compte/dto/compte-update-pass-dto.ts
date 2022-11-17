import { IsString } from "class-validator";

export class CompteUpdatePassDto {
    @IsString()
    oldPass: string;

    @IsString()
    newPass: string;
}