import { Injectable } from '@nestjs/common';
import { Region } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';

@Injectable()
export class RegionService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateRegionDto): Promise<Region> {
    const { address, parentId } = data;

    return await this.prisma.region.create({
      data: {
        address,
        parentId: parentId || null,
      },
      include: {
        parent: true,
        children: true,
      },
    });
  }

  async findAll(): Promise<Region[]> {
    return await this.prisma.region.findMany({ include: { children: true } });
  }

  async findOne(id: number): Promise<Region> {
    return await this.prisma.region.findFirst({
      where: { id },
      include: { children: true },
    });
  }

  async update(id: number, data: UpdateRegionDto): Promise<Region> {
    return await this.prisma.region.update({ where: { id }, data });
  }

  async remove(id: number): Promise<Region> {
    return await this.prisma.region.delete({ where: { id } });
  }
}
