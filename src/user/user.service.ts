import { Injectable } from '@nestjs/common';
import { UserDTO } from 'src/utils/dto/user.dto';
import { User } from './schemas/user.schema';
import { UserRepository } from './user.repo';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  async getUserByEmail(email: string): Promise<User> {
    return this.userRepo.findOne({ email });
  }

  async getOneUser(id: string) {
    return this.userRepo.findOne({ id });
  }

  async getUsers(): Promise<User[]> {
    return this.userRepo.find({});
  }

  async createUser(user: UserDTO): Promise<User> {
    return this.userRepo.createOne(user);
  }
}
