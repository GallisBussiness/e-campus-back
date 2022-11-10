import { IsMongoId, IsNumber, IsString } from "class-validator";

export class CreateCompteDto {
    @IsString()
    code: string;

    @IsNumber()
    solde: number;

    @IsMongoId()
    etudiant: string;
}
