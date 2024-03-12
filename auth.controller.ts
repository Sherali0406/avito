import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { AuthService } from './src/auth/auth.service';
import { LoginAuthDto } from './src/auth/dto/login.auth';
import { SignupAuthDto } from './src/auth/dto/signup.auth';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(
    @Body() loginDto: LoginAuthDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.login(loginDto, req, res);
  }

  @Post('signup')
  signupUser(@Body() signupDto: SignupAuthDto) {
    return this.authService.signupUser(signupDto);
  }
}
