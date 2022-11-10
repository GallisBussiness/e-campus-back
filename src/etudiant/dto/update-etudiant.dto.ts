import { PartialType } from '@nestjs/mapped-types';
import { CreateEtudiantDto } from './create-etudiant.dto';

export class UpdateEtudiantDto extends PartialType(CreateEtudiantDto) {}
