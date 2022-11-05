import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { UserService } from './user.service';

@Controller('user')
export class UsersController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUsers() {
    return this.userService.getUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUserById(id: string) {
    return this.userService.getOneUser(id);
  }
}
