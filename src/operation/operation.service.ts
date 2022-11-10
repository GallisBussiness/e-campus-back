import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOperationDto } from './dto/create-operation.dto';
import { UpdateOperationDto } from './dto/update-operation.dto';
import { Operation, OperationDocument } from './entities/operation.entity';

@Injectable()
export class OperationService {
  constructor(@InjectModel(Operation.name) private OperationModel: Model<OperationDocument>){}


  async create(createOperationDto: CreateOperationDto):Promise<Operation> {
    try {
      const creadtedOperation = new this.OperationModel(createOperationDto);
      return await creadtedOperation.save();
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
