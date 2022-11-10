import { IsBoolean, IsEnum, IsMongoId, IsNumber, IsOptional, IsString } from "class-validator";
import { TYPE_OPERATION } from "../entities/operation.entity";

export class CreateOperationDto {
    @IsString()
    date: string;

    @IsString()
    heure: string;

    @IsNumber()
    montant: number;

    @IsEnum(TYPE_OPERATION, {each: true})
    type: string;

    @IsMongoId()
    compte: string;

    @IsString()
    description: string;

    @IsMongoId()
    service: string;

    @IsBoolean()
    @IsOptional()
    isOwn: boolean;

    @IsString()
    responsable: string;
}
