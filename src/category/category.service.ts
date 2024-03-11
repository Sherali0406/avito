// src/category/category.service.ts

import { Injectable } from '@nestjs/common';
import { Category } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCategoryDto): Promise<Category> {
    const { name, parentId } = data;

    return await this.prisma.category.create({
      data: {
        name,
        parentId: parentId || null, // Set parentId to null if not provided
      },
      include: {
        parent: true,
        children: true,
      },
    });
  }

  async findAll(): Promise<Category[]> {
    return await this.prisma.category.findMany({
      include: { children: true }, // Update to use the correct field name
    });
  }

  async findOne(id: number): Promise<Category> {
    return await this.prisma.category.findUnique({
      where: { id },
      include: { children: true }, // Update to use the correct field name
    });
  }

  async update(id: number, data: UpdateCategoryDto): Promise<Category> {
    return await this.prisma.category.update({ where: { id }, data });
  }

  async remove(id: number): Promise<Category> {
    return await this.prisma.category.delete({ where: { id } });
  }
}
