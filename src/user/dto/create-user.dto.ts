import { IsArray, IsEmail, IsEnum, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

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
  @IsArray({each: true})
  role: string[];
}
