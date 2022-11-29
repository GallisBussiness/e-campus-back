import { IsOptional, IsString } from "class-validator";

export class CreatePubDto {
    @IsString()
    titre: string;

    @IsString()
    description: string;

    @IsOptional()
    audio: string;
}
