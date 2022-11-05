import { Body, Post, Controller, UseGuards, Request } from '@nestjs/common';
import { UserDTO } from 'src/utils/dto/user.dto';
import { AuthService } from './auth.service';
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
}
