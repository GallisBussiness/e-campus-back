import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Service, ServiceDocument } from './entities/service.entity';
import { PayementSubjectService } from 'src/payement-subject/payement-subject.service';

@Injectable()
export class ServiceService {
  constructor(@InjectModel(Service.name,'ecampus') private ServiceModel: Model<ServiceDocument>,
  private readonly payementSubjectService : PayementSubjectService){}


  async create(createServiceDto: CreateServiceDto):Promise<Service> {
    try {
      const creadtedService = new this.ServiceModel(createServiceDto);
      return await creadtedService.save();
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async findAll(): Promise<Service[]> {
  try {
    return await this.ServiceModel.find();
  } catch (error) {
    throw new HttpException(error.message, 500);
  }
  }

  async findOne(id: string): Promise<Service> {
    try {
      return await this.ServiceModel.findById(id);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async update(id: string, updateServiceDto: UpdateServiceDto):Promise<Service> {
    try {
      return await this.ServiceModel.findByIdAndUpdate(id, updateServiceDto);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async remove(id: string): Promise<Service> {
    try {
      const s = await this.ServiceModel.findByIdAndDelete(id);
      await this.payementSubjectService.deleteMany(s._id);
      return s;
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
}
