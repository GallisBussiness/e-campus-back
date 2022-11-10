import { Injectable } from '@nestjs/common';
import { CreateEtudiantDto } from './dto/create-etudiant.dto';
import { UpdateEtudiantDto } from './dto/update-etudiant.dto';

@Injectable()
export class EtudiantService {
  create(createEtudiantDto: CreateEtudiantDto) {
    return 'This action adds a new etudiant';
  }

  findAll() {
    return `This action returns all etudiant`;
  }

  findOne(id: number) {
    return `This action returns a #${id} etudiant`;
  }

  update(id: number, updateEtudiantDto: UpdateEtudiantDto) {
    return `This action updates a #${id} etudiant`;
  }

  remove(id: number) {
    return `This action removes a #${id} etudiant`;
  }
}
