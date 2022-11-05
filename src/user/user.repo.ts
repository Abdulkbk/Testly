import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { UserDTO } from 'src/utils/dto/user.dto';
import { hashPassword } from 'src/utils/helper/helper';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findOne(userFilterQuery: FilterQuery<User>): Promise<User> {
    return this.userModel.findOne(userFilterQuery);
  }

  async find(userFilterQuery: FilterQuery<User>): Promise<User[]> {
    return this.userModel.find(userFilterQuery);
  }

  async findOneById(userFilterQuery: FilterQuery<User>): Promise<User> {
    return this.userModel.findById(userFilterQuery);
  }

  async createOne(user: UserDTO): Promise<User> {
    const newUser = new this.userModel(user);
    newUser.password = await hashPassword(newUser.password);
    return newUser.save();
  }

  async findOneAndUpdate(
    userFilterQuery: FilterQuery<User>,
    user: Partial<User>,
  ): Promise<User> {
    return this.userModel.findOneAndUpdate(userFilterQuery, user);
  }

  async findOneAndDelete(userFilterQuery: FilterQuery<User>): Promise<any> {
    return this.userModel.findByIdAndDelete(userFilterQuery);
  }
}
