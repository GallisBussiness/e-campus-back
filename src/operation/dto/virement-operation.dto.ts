import { IsMongoId, IsNumber } from "class-validator";

export class VirementOperationDto {
    @IsMongoId()
    id_from: string;

    @IsMongoId()
    id_to: string;

    @IsNumber()
    montant: number;
}