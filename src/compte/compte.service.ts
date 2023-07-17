import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CompteUpdatePassDto } from './dto/compte-update-pass-dto';
import { CompteLoginDto } from './dto/compteLoginDto';
import { CreateCompteDto } from './dto/create-compte.dto';
import { UpdateCompteDto } from './dto/update-compte.dto';
import { Compte, CompteDocument } from './entities/compte.entity';
import * as bcrypt from 'bcryptjs';
import { hashFromRequest } from 'src/utils/hash-pass-from-request';

@Injectable()
export class CompteService {
  constructor(
    @InjectModel(Compte.name) private compteModel: Model<CompteDocument>,
    ){}


  async create(createCompteDto: CreateCompteDto):Promise<Compte> {
    try {
      const createCompte = await hashFromRequest(createCompteDto);
      const creadtedCompte = new this.compteModel(createCompte);
      return await creadtedCompte.save();
    } catch (error) {
     throw new HttpException(error.message, 500);
    }
  }

  async login(compteLoginDto: CompteLoginDto):Promise<Compte> {
      const compte = await this.findOneByCode(compteLoginDto.code);
      if(compte) {
        const isMatch = await bcrypt.compare(compteLoginDto.password, compte.password);
        if(isMatch) return compte;
      }
      throw new UnauthorizedException();
  }

  async changepassword(id: string,compteUpdatePassDto: CompteUpdatePassDto):Promise<Compte> {
    const compte = await this.findOne(id);
    if(compte) {
      const isMatch = await bcrypt.compare(compteUpdatePassDto.oldPass, compte.password);
      if(isMatch) {
        const np = await hashFromRequest(compteUpdatePassDto);
        return  await  this.update(id,{password: np.password})
      }
    }
    throw new UnauthorizedException();
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
  async count(): Promise<number> {
    try {
      return await this.compteModel.count();
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async findOneByCode(code: string): Promise<Compte> {
    try {
      return await this.compteModel.findOne({code});
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async findOneByEtudiant(id: string): Promise<Compte> {
    try {
      return await this.compteModel.findOne({etudiant: id});
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
