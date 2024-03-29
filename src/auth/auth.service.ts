import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { PrismaService } from '../prisma/prisma.service';
import { LoginAuthDto } from './dto/login.auth';
import { SignupAuthDto } from './dto/signup.auth';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async signupUser(signupDto: SignupAuthDto) {
    try {
      const { first_name, last_name, phone, password, confirm_password } =
        signupDto;
      if (password !== confirm_password) {
        throw new BadRequestException('Confirm password is not matched');
      }

      const exist = await this.prisma.user.findFirst({ where: { phone } });
      if (exist) {
        throw new BadRequestException(
          'Phone number is already registered by another User',
        );
      }

      const hashed_password = await bcrypt.hash(password, 7);

      const user = await this.prisma.user.create({
        data: {
          first_name,
          last_name,
          phone,
          password: hashed_password,
          role: 'USER',
          address: 'Tashkent shaxar',
        },
        select: {
          id: true,
          first_name: true,
          last_name: true,
          phone: true,
        },
      });

      return user;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async login(loginDto: LoginAuthDto, req: Request, res: Response) {
    try {
      const user = await this.prisma.user.findFirst({
        where: { phone: loginDto.phone },
      });
      if (!user) {
        throw new UnauthorizedException('Username or password is incorrect');
      }
      const compare = await bcrypt.compare(loginDto.password, user.password);
      if (!compare) {
        throw new UnauthorizedException('Username or password is incorrect');
      }
      const tokens = await this.generateToken(user.id);
      const hashed_token = await bcrypt.hash(tokens.refresh_token, 7);
      const update = await this.prisma.user.update({
        where: { id: user.id },
        data: { token: hashed_token },
        select: {
          id: true,
          first_name: true,
          last_name: true,
          phone: true,
        },
      });
      return {
        id: update.id,
        first_name: update.first_name,
        last_name: update.last_name,
        phone: update.phone,
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async generateToken(id: number) {
    try {
      const access_token = await this.jwtService.signAsync(
        { id },
        { expiresIn: process.env.ACCESS_TIME, secret: process.env.ACCESS_KEY },
      );
      const refresh_token = await this.jwtService.signAsync(
        { id },
        {
          expiresIn: process.env.REFRESH_TIME,
          secret: process.env.REFRESH_KEY,
        },
      );
      return { access_token, refresh_token };
    } catch (error) {
      return null;
    }
  }
}
