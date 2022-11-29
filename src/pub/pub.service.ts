import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePubDto } from './dto/create-pub.dto';
import { UpdatePubDto } from './dto/update-pub.dto';
import { Pub, PubDocument } from './entities/pub.entity';

@Injectable()
export class PubService {
  constructor(@InjectModel(Pub.name) private PubModel: Model<PubDocument>){}


  async create(createPubDto: CreatePubDto):Promise<Pub> {
    try {
      const creadtedPub = new this.PubModel(createPubDto);
      return await creadtedPub.save();
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async findAll(): Promise<Pub[]> {
  try {
    return await this.PubModel.find();
  } catch (error) {
    throw new HttpException(error.message, 500);
  }
  }

  async findOne(id: string): Promise<Pub> {
    try {
      return await this.PubModel.findById(id);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }


  async update(id: string, updatePubDto: UpdatePubDto):Promise<Pub> {
    try {
      return await this.PubModel.findByIdAndUpdate(id, updatePubDto);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async remove(id: string): Promise<Pub> {
    try {
      return await this.PubModel.findByIdAndDelete(id);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
}
