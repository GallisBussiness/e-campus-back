import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEtudiantDto } from './dto/create-etudiant.dto';
import { UpdateEtudiantDto } from './dto/update-etudiant.dto';
import { Etudiant, EtudiantDocument } from './entities/etudiant.entity';

@Injectable()
export class EtudiantService {
  constructor(@InjectModel(Etudiant.name) private etudiantModel: Model<EtudiantDocument>){}


  async create(createEtudiantDto: CreateEtudiantDto):Promise<Etudiant> {
    try {
      const creadtedEtudiant = new this.etudiantModel(createEtudiantDto);
      return await creadtedEtudiant.save();
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async findAll(): Promise<Etudiant[]> {
  try {
    return await this.etudiantModel.find();
  } catch (error) {
    throw new HttpException(error.message, 500);
  }
  }

  async findOne(id: string): Promise<Etudiant> {
    try {
      return await this.etudiantModel.findById(id);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async findOneByNce(nce: string): Promise<Etudiant> {
    try {
      return await this.etudiantModel.findById({nce});
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async update(id: string, updateEtudiantDto: UpdateEtudiantDto):Promise<Etudiant> {
    try {
      return await this.etudiantModel.findByIdAndUpdate(id, updateEtudiantDto);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async remove(id: string): Promise<Etudiant> {
    try {
      return await this.etudiantModel.findByIdAndDelete(id);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
}
