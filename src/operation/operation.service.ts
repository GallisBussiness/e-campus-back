import { HttpException, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CreateOperationDto } from './dto/create-operation.dto';
import { UpdateOperationDto } from './dto/update-operation.dto';
import { Operation, OperationDocument, TYPE_OPERATION } from './entities/operation.entity';
import { Compte, CompteDocument } from 'src/compte/entities/compte.entity';

@Injectable()
export class OperationService {
  constructor(
    @InjectModel(Compte.name,'ecampus') private compteModel: Model<CompteDocument>,
    @InjectModel(Operation.name,'ecampus') private OperationModel: Model<OperationDocument>,
    @InjectConnection('ecampus') private readonly connection: mongoose.Connection,
  ){}


  async depot(createOperationDto: CreateOperationDto):Promise<Operation> {
    const session = await this.connection.startSession();
    session.startTransaction();
    try {
      const compte = await this.compteModel.findById(createOperationDto.compte).session(session);
      const createdOperation = new this.OperationModel(createOperationDto);
      createdOperation.type = TYPE_OPERATION.DPT;
      createdOperation.description = `dépot de ${createdOperation.montant}`;
      const nopp = await createdOperation.save({session});
      const solde = compte.solde + nopp.montant;
      const c = await this.compteModel.findByIdAndUpdate(compte._id, {solde }).session(session);
      await session.commitTransaction();
      return nopp;
    } catch (error) {
      await session.abortTransaction();
      throw new HttpException(error.message, 500);
    }
    finally {
      session.endSession();
    }
  }
  async retrait(createOperationDto: CreateOperationDto):Promise<Operation> {
    const session = await this.connection.startSession();
    session.startTransaction();
    try {
      const compte = await this.compteModel.findById(createOperationDto.compte).session(session);
      const createdOperation = new this.OperationModel(createOperationDto);
      createdOperation.type = TYPE_OPERATION.RTR;
      createdOperation.description = `retrait de ${createdOperation.montant}`;
      const nopp = await createdOperation.save({session});
      const c = await this.compteModel.findByIdAndUpdate(compte._id, {solde:compte.solde - nopp.montant }).session(session);
      await session.commitTransaction();
      return nopp;
    } catch (error) {
      await session.abortTransaction();
      throw new HttpException(error.message, 500);
    }
    finally {
      session.endSession();
    }
  }

  async findAll(): Promise<Operation[]> {
  try {
    return await this.OperationModel.find().sort({createdAt: 'desc'});
  } catch (error) {
    throw new HttpException(error.message, 500);
  }
  }

  async findAllByCompte(id: string): Promise<Operation[]> {
    try {
      return await this.OperationModel.find({compte: id}).sort({createdAt: 'desc'});
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
    }

    async findLatestByCompte(id: string): Promise<Operation[]> {
      try {
        return await this.OperationModel.find({compte: id}).limit(6).sort({createdAt: 'desc'});
      } catch (error) {
        throw new HttpException(error.message, 500);
      }
      }

  async findOne(id: string): Promise<Operation> {
    try {
      return await this.OperationModel.findById(id);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async deleteMany(id: string): Promise<any> {
    try {
      const op = await this.OperationModel.deleteMany({compte: id.toString()});
      return op.deletedCount;
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async count(): Promise<number> {
    try {
      return await this.OperationModel.count();
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async update(id: string, updateOperationDto: UpdateOperationDto):Promise<Operation> {
    try {
      return await this.OperationModel.findByIdAndUpdate(id, updateOperationDto);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async remove(id: string): Promise<Operation> {
    try {
      return await this.OperationModel.findByIdAndDelete(id);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
}
