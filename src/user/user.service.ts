import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto): Promise<User> {
    try {
      return await this.prisma.user.create({ data });
    } catch (error) {
      console.error(`Error creating user: ${error.message}`);
      throw new Error('Unable to create user');
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.prisma.user.findMany({ include: { posts: true } });
    } catch (error) {
      console.error(`Error fetching users: ${error.message}`);
      throw new Error('Unable to fetch users');
    }
  }

  async findOne(id: number): Promise<User | null> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
      });

      if (!user) {
        throw new NotFoundException(`User with id ${id} not found`);
      }

      return user;
    } catch (error) {
      console.error(`Error fetching user by id ${id}: ${error.message}`);
      throw error;
    }
  }

  async update(id: number, data: UpdateUserDto): Promise<User> {
    try {
      const user = await this.prisma.user.update({
        where: { id },
        data,
      });

      if (!user) {
        throw new NotFoundException(`User with id ${id} not found`);
      }

      return user;
    } catch (error) {
      console.error(`Error updating user with id ${id}: ${error.message}`);
      throw error;
    }
  }

  async remove(id: number): Promise<User> {
    try {
      const user = await this.prisma.user.delete({
        where: { id },
      });

      if (!user) {
        throw new NotFoundException(`User with id ${id} not found`);
      }

      return user;
    } catch (error) {
      console.error(`Error deleting user with id ${id}: ${error.message}`);
      throw error;
    }
  }
}
