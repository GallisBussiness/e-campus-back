import { PartialType } from '@nestjs/mapped-types';
import { CreatePayementSubjectDto } from './create-payement-subject.dto';

export class UpdatePayementSubjectDto extends PartialType(CreatePayementSubjectDto) {}
