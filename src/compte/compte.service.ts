import { BadRequestException, HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CompteUpdatePassDto } from './dto/compte-update-pass-dto';
import { CompteLoginDto } from './dto/compteLoginDto';
import { CreateCompteDto } from './dto/create-compte.dto';
import { UpdateCompteDto } from './dto/update-compte.dto';
import { Compte, CompteDocument } from './entities/compte.entity';
import * as bcrypt from 'bcryptjs';
import { hashFromRequest } from 'src/utils/hash-pass-from-request';
import { OperationService } from 'src/operation/operation.service';
import { Etudiant, EtudiantDocument } from 'src/etudiant/entities/etudiant.entity';

@Injectable()
export class CompteService {
  constructor(
    @InjectModel(Compte.name,'ecampus') private compteModel: Model<CompteDocument>,
    @InjectModel(Etudiant.name,'etudiant') private etudiantModel: Model<EtudiantDocument>,
    private readonly operationService:OperationService
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
        if(isMatch) {
        return compte; 
        }
        else {
          throw new BadRequestException("Mot de passe incorrect");
        }
      }
      throw new UnauthorizedException();
  }

  async changepassword(id: string,compteUpdatePassDto: CompteUpdatePassDto):Promise<Compte> {
    const compte = await this.findOne(id);
    if(compte) {
      const isMatch = await bcrypt.compare(compteUpdatePassDto.oldPass, compte.password);
      if(isMatch) {
        const np = await hashFromRequest(compteUpdatePassDto);
        return  await this.update(id,{password: np.password})
      }
      else {
        throw new UnauthorizedException();
      }
    }
    throw new UnauthorizedException();
}

  async findAll(): Promise<Compte[]> {
  try {
    return await this.compteModel.find().populate('etudiant','',this.etudiantModel);
  } catch (error) {
    throw new HttpException(error.message, 500);
  }
  }

  async findOne(id: string): Promise<Compte> {
    try {
      return await this.compteModel.findById(id).populate('etudiant','',this.etudiantModel);
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
      return await this.compteModel.findOne({code}).populate('etudiant','',this.etudiantModel);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async findOneByEtudiant(id: string): Promise<Compte> {
    try {
      return await this.compteModel.findOne({etudiant: id}).populate('etudiant','',this.etudiantModel);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async update(id: string, updateCompteDto: UpdateCompteDto):Promise<Compte> {
    try {
      return await this.compteModel.findByIdAndUpdate(id, updateCompteDto).populate('etudiant','',this.etudiantModel);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async remove(id: string): Promise<Compte> {
    try {
      const c =  await this.compteModel.findByIdAndDelete(id).populate('etudiant','',this.etudiantModel);
       await this.operationService.deleteMany(c._id);
      return c;
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
}
