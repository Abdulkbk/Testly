import {
  Body,
  Post,
  Controller,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { UserDTO } from 'src/utils/dto/user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { LocalAuthGuard } from './guard/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signin(@Request() req) {
    return this.authService.sigin(req.user);
  }

  @Post('signup')
  async signup(@Body() user: UserDTO) {
    return this.authService.signup(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('refresh')
  async getToken(@Request() req, @Body() refresh: string) {
    return this.authService.updateToken(req.user, refresh);
  }
}
