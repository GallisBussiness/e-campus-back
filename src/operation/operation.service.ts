import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOperationDto } from './dto/create-operation.dto';
import { UpdateOperationDto } from './dto/update-operation.dto';
import { Operation, OperationDocument, TYPE_OPERATION } from './entities/operation.entity';

@Injectable()
export class OperationService {
  constructor(@InjectModel(Operation.name) private OperationModel: Model<OperationDocument>){}


  async depot(createOperationDto: CreateOperationDto):Promise<Operation> {
    try {
      const createdOperation = new this.OperationModel(createOperationDto);
      createdOperation.type = TYPE_OPERATION.DPT;
      createdOperation.description = `dépot de ${createdOperation.montant}`;
      return await createdOperation.save();
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
  async retrait(createOperationDto: CreateOperationDto):Promise<Operation> {
    try {
      const createdOperation = new this.OperationModel(createOperationDto);
      createdOperation.type = TYPE_OPERATION.RTR;
      createdOperation.description = `retrait de ${createdOperation.montant}`;
      return await createdOperation.save();
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async findAll(): Promise<Operation[]> {
  try {
    return await this.OperationModel.find();
  } catch (error) {
    throw new HttpException(error.message, 500);
  }
  }

  async findAllByCompte(id: string): Promise<Operation[]> {
    try {
      return await this.OperationModel.find({compte: id});
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
