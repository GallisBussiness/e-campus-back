import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCompteDto } from './dto/create-compte.dto';
import { UpdateCompteDto } from './dto/update-compte.dto';
import { Compte, CompteDocument } from './entities/compte.entity';

@Injectable()
export class CompteService {
  constructor(@InjectModel(Compte.name) private compteModel: Model<CompteDocument>){}


  async create(createCompteDto: CreateCompteDto):Promise<Compte> {
    try {
      const creadtedCompte = new this.compteModel(createCompteDto);
      return await creadtedCompte.save();
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async findAll(): Promise<Compte[]> {
  try {
    return await this.compteModel.find();
  } catch (error) {
    throw new HttpException(error.message, 500);
  }
  }

  async findOne(id: string): Promise<Compte> {
    try {
      return await this.compteModel.findById(id);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async update(id: string, updateCompteDto: UpdateCompteDto):Promise<Compte> {
    try {
      return await this.compteModel.findByIdAndUpdate(id, updateCompteDto);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async remove(id: string): Promise<Compte> {
    try {
      return await this.compteModel.findByIdAndDelete(id);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
}
