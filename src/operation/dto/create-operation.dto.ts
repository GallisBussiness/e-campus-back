import { IsBoolean, IsEnum, IsMongoId, IsNumber, IsOptional, IsString } from "class-validator";
import { TYPE_OPERATION } from "../entities/operation.entity";

export class CreateOperationDto {

    @IsNumber()
    montant: number;

    @IsOptional()
    @IsEnum(TYPE_OPERATION, {each: true})
    type?: string;

    @IsMongoId()
    compte: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsMongoId()
    payement_subject?: string;

    @IsOptional()
    @IsBoolean()
    isVirement?: boolean;

    @IsOptional()
    @IsString()
    responsable?: string;
}
