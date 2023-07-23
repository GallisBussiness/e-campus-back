import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePayementSubjectDto } from './dto/create-payement-subject.dto';
import { UpdatePayementSubjectDto } from './dto/update-payement-subject.dto';
import { PayementSubject, PayementSubjectDocument } from './entities/payement-subject.entity';

@Injectable()
export class PayementSubjectService {
  constructor(@InjectModel(PayementSubject.name,'ecampus') private PayementSubjectModel: Model<PayementSubjectDocument>){}


  async create(createPayementSubjectDto: CreatePayementSubjectDto):Promise<PayementSubject> {
    try {
      const creadtedPayementSubject = new this.PayementSubjectModel(createPayementSubjectDto);
      return await creadtedPayementSubject.save();
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async findAll(): Promise<PayementSubject[]> {
  try {
    return await this.PayementSubjectModel.find();
  } catch (error) {
    throw new HttpException(error.message, 500);
  }
  }

  async findAllByService(id: string): Promise<PayementSubject[]> {
    try {
      return await this.PayementSubjectModel.find({service: id});
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
    }

  async findOne(id: string): Promise<PayementSubject> {
    try {
      return await this.PayementSubjectModel.findById(id);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async deleteMany(service: string): Promise<Number> {
    try {
      return (await this.PayementSubjectModel.deleteMany({service})).deletedCount;
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async update(id: string, updatePayementSubjectDto: UpdatePayementSubjectDto):Promise<PayementSubject> {
    try {
      return await this.PayementSubjectModel.findByIdAndUpdate(id, updatePayementSubjectDto);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async remove(id: string): Promise<PayementSubject> {
    try {
      return await this.PayementSubjectModel.findByIdAndDelete(id);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
}
