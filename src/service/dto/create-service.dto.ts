import { IsString } from "class-validator";

export class CreateServiceDto {
    @IsString()
    nom: string;
}
