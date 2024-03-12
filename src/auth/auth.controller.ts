import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login.auth';
import { SignupAuthDto } from './dto/signup.auth';

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
