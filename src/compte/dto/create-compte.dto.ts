import { IsMongoId, IsNumber, IsString } from "class-validator";

export class CreateCompteDto {
    @IsNumber()
    solde: number;

    @IsMongoId()
    etudiant: string;
}
