import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCategoryDto): Promise<Category> {
    try {
      const { name, parentId, main_photo } = data;

      return await this.prisma.category.create({
        data: {
          name,
          parentId: parentId || null,
          main_photo,
        },
        include: {
          parent: true,
          children: true,
        },
      });
    } catch (error) {
      console.error(`Error creating category: ${error.message}`);
      throw new Error('Unable to create category');
    }
  }

  async findAll(): Promise<Category[]> {
    try {
      return await this.prisma.category.findMany({
        include: { children: true },
      });
    } catch (error) {
      console.error(`Error fetching categories: ${error.message}`);
      throw new Error('Unable to fetch categories');
    }
  }

  async findOne(id: number): Promise<Category> {
    try {
      return await this.prisma.category.findUnique({
        where: { id },
        include: { children: true },
      });
    } catch (error) {
      console.error(`Error fetching category by id ${id}: ${error.message}`);
      throw new NotFoundException(`Category with id ${id} not found`);
    }
  }

  async update(id: number, data: UpdateCategoryDto): Promise<Category> {
    try {
      return await this.prisma.category.update({ where: { id }, data });
    } catch (error) {
      console.error(`Error updating category with id ${id}: ${error.message}`);
      throw new Error('Unable to update category');
    }
  }

  async remove(id: number): Promise<Category> {
    try {
      return await this.prisma.category.delete({ where: { id } });
    } catch (error) {
      console.error(`Error deleting category with id ${id}: ${error.message}`);
      throw new Error('Unable to delete category');
    }
  }
  
  async uploadMainPhoto(id: number, mainPhotoUrl: string) {
    try {
      return await this.prisma.category.update({
        where: { id },
        data: { main_photo: mainPhotoUrl },
      });
    } catch (error) {
      console.error(
        `Error uploading main photo for post with id ${id}: ${error.message}`,
      );
      throw new Error('Unable to upload main photo');
    }
  }
}
