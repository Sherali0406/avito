import { Injectable } from '@nestjs/common';
import { Characteristics } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCharacteristicDto } from './dto/create-characteristic.dto';
import { UpdateCharacteristicDto } from './dto/update-characteristic.dto';

@Injectable()
export class CharacteristicsService {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateCharacteristicDto): Promise<Characteristics> {
    return await this.prisma.characteristics.create({ data });
  }

  async findAll(): Promise<Characteristics[]> {
    return await this.prisma.characteristics.findMany({});
  }

  async findOne(id: number): Promise<Characteristics> {
    return await this.prisma.characteristics.findFirst({ where: { id } });
  }

  async update(
    id: number,
    data: UpdateCharacteristicDto,
  ): Promise<Characteristics> {
    return await this.prisma.characteristics.update({ where: { id }, data });
  }

  async remove(id: number): Promise<Characteristics> {
    return await this.prisma.characteristics.delete({ where: { id } });
  }
}
