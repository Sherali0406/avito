import { Injectable, NotFoundException } from '@nestjs/common';
import { Region } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';

@Injectable()
export class RegionService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateRegionDto): Promise<Region> {
    try {
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
    } catch (error) {
      console.error(`Error creating region: ${error.message}`);
      throw new Error('Unable to create region');
    }
  }

  async findAll(): Promise<Region[]> {
    try {
      return await this.prisma.region.findMany({ include: { children: true } });
    } catch (error) {
      console.error(`Error fetching regions: ${error.message}`);
      throw new Error('Unable to fetch regions');
    }
  }

  async findOne(id: number): Promise<Region> {
    try {
      return await this.prisma.region.findFirst({
        where: { id },
        include: { children: true },
      });
    } catch (error) {
      console.error(`Error fetching region by id ${id}: ${error.message}`);
      throw new NotFoundException(`Region with id ${id} not found`);
    }
  }

  async update(id: number, data: UpdateRegionDto): Promise<Region> {
    try {
      return await this.prisma.region.update({ where: { id }, data });
    } catch (error) {
      console.error(`Error updating region with id ${id}: ${error.message}`);
      throw new Error('Unable to update region');
    }
  }

  async remove(id: number): Promise<Region> {
    try {
      return await this.prisma.region.delete({ where: { id } });
    } catch (error) {
      console.error(`Error deleting region with id ${id}: ${error.message}`);
      throw new Error('Unable to delete region');
    }
  }
}
