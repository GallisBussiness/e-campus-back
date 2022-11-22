import { IsArray, IsEmail, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class CreateUserDto {
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

  @IsOptional()
  @IsArray()
  role: string[];
}
