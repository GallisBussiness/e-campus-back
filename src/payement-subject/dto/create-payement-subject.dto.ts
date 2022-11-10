import { IsMongoId, IsNumber, IsString } from "class-validator";

export class CreatePayementSubjectDto {
    @IsString()
    nom: string;

    @IsNumber()
    prix: number;

    @IsMongoId()
    service: string;
}
