import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/schemas/user.schema';
import { UserService } from 'src/user/user.service';
import { UserDTO } from 'src/utils/dto/user.dto';
import { NotFoundException } from '@nestjs/common';
import { comparePassword } from 'src/utils/helper/helper';
import jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const userFound = await this.userService.getUserByEmail(email);

    console.log(userFound);

    if (userFound && (await comparePassword(password, userFound.password))) {
      return userFound;
    } else {
      throw new NotFoundException({
        message: `User with email ${email} is not found`,
      });
    }
  }

  async sigin(user: any) {
    const payload = { name: user.name, id: user.id };

    const refresh = jwt.sign(payload, process.env.REFRESH_SECRET, {
      expiresIn: '15d',
    });

    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: refresh,
      user: user,
    };
  }

  async signup(user: UserDTO): Promise<User> {
    return this.userService.createUser(user);
  }

  async updateToken(payload: any, refresh_token: string) {
    const verified = jwt.verify(refresh_token, process.env.REFRESH_SECRET);
    if (verified) {
      return {
        access_token: this.jwtService.sign(payload),
        refresh_token: jwt.sign(payload, process.env.REFRESH_SECRET, {
          expiresIn: '15d',
        }),
      };
    }
  }
}
