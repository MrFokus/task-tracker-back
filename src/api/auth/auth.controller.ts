import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  // @Post('/register')
  // registration() {

  // }

  @Post('auth')
  auth(@Body() authDto: AuthDto) {
    return this.authService.auth(authDto)
  }

  @Post('verify')
  verify(@Body() token) {
    console.log(token);
    return this.authService.JwtVerify(token.access_token)
  }
}
