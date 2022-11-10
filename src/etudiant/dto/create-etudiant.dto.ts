import { IsEmail, IsPhoneNumber, IsString } from "class-validator";

export class CreateEtudiantDto {
  @IsString()
  prenom: string;

  @IsString()
  nom: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber('SN')
  tel: string;

  @IsString()
  password: string;

  @IsString()
  dateDeNaissance: string;

  @IsString()
  lieuDeNaissance: string;

  @IsString()
  formation: string;

  @IsString()
  avatar: string;

  @IsString()
  nce: string;
}
