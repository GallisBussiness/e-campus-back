import { PartialType } from '@nestjs/mapped-types';
import { CreatePubDto } from './create-pub.dto';

export class UpdatePubDto extends PartialType(CreatePubDto) {}
