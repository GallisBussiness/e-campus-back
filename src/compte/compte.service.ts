import { Injectable } from '@nestjs/common';
import { CreateCompteDto } from './dto/create-compte.dto';
import { UpdateCompteDto } from './dto/update-compte.dto';

@Injectable()
export class CompteService {
  create(createCompteDto: CreateCompteDto) {
    return 'This action adds a new compte';
  }

  findAll() {
    return `This action returns all compte`;
  }

  findOne(id: number) {
    return `This action returns a #${id} compte`;
  }

  update(id: number, updateCompteDto: UpdateCompteDto) {
    return `This action updates a #${id} compte`;
  }

  remove(id: number) {
    return `This action removes a #${id} compte`;
  }
}
