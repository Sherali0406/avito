import { Injectable, NotFoundException } from '@nestjs/common';
import { Characteristics } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCharacteristicDto } from './dto/create-characteristic.dto';
import { UpdateCharacteristicDto } from './dto/update-characteristic.dto';

@Injectable()
export class CharacteristicsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCharacteristicDto): Promise<Characteristics> {
    try {
      return await this.prisma.characteristics.create({ data });
    } catch (error) {
      console.error('Error creating characteristic:', error.message);
      throw new Error('Failed to create characteristic');
    }
  }

  async findAll(): Promise<Characteristics[]> {
    try {
      return await this.prisma.characteristics.findMany({});
    } catch (error) {
      console.error('Error fetching characteristics:', error.message);
      throw new Error('Failed to fetch characteristics');
    }
  }

  async findOne(id: number): Promise<Characteristics> {
    try {
      const characteristic = await this.prisma.characteristics.findFirst({
        where: { id },
      });

      if (!characteristic) {
        throw new NotFoundException('Characteristic not found');
      }

      return characteristic;
    } catch (error) {
      console.error(
        `Error fetching characteristic with ID ${id}:`,
        error.message,
      );
      throw new Error(`Failed to fetch characteristic with ID ${id}`);
    }
  }

  async update(
    id: number,
    data: UpdateCharacteristicDto,
  ): Promise<Characteristics> {
    try {
      return await this.prisma.characteristics.update({ where: { id }, data });
    } catch (error) {
      console.error(
        `Error updating characteristic with ID ${id}:`,
        error.message,
      );
      throw new Error(`Failed to update characteristic with ID ${id}`);
    }
  }

  async remove(id: number): Promise<Characteristics> {
    try {
      return await this.prisma.characteristics.delete({ where: { id } });
    } catch (error) {
      console.error(
        `Error deleting characteristic with ID ${id}:`,
        error.message,
      );
      throw new Error(`Failed to delete characteristic with ID ${id}`);
    }
  }
}
