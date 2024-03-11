import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateUserDto): Promise<User> {
    return await this.prisma.user.create({ data });
  }
  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany({ include: { post: true } });
  }

  async findOne(id: number): Promise<User | null> {
    try {
      return await this.prisma.user.findUnique({
        where: { id },
      });
    } catch (error) {
      return error;
    }
  }

  async update(id: number, data: UpdateUserDto): Promise<User> {
    try {
      const user = await this.prisma.user.update({
        where: { id },
        data,
      });
      return user;
    } catch (error) {
      return error;
    }
  }

  async remove(id: number): Promise<User> {
    try {
      return this.prisma.user.delete({
        where: { id },
      });
    } catch (error) {
      return error;
    }
  }
}
