import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { hashFromRequest } from 'src/utils/hash-pass-from-request';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const createUser = await hashFromRequest(createUserDto);
      const createdUser = new this.userModel(createUser);
      return await createdUser.save();
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async createMany(createUserDto: CreateUserDto[]): Promise<User[]> {
    try {
       return await this.userModel.insertMany(createUserDto);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.userModel.find();
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async findOne(id: string): Promise<User> {
    try {
      return await this.userModel.findById(id);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      return await this.userModel.findByIdAndUpdate(id, updateUserDto);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async remove(id: string): Promise<User> {
    try {
      return await this.userModel.findByIdAndDelete(id);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async findByUsername(username: string): Promise<User> {
    try {
      return await this.userModel.findOne({ email: username });
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
}
