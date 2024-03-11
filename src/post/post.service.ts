import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreatePostDto) {
    return await this.prisma.post.create({ data });
  }

  async findAll() {
    return await this.prisma.post.findMany({
      include: {
        author: true,
        regions: {
          include: {
            parent: true,
            children: true,
          },
        },
        categories: {
          include: {
            parent: true,
            children: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.post.findFirst({ where: { id } });
  }

  async update(id: number, data: UpdatePostDto) {
    return await this.prisma.post.update({ where: { id }, data });
  }

  async remove(id: number) {
    return await this.prisma.post.delete({ where: { id } });
  }

  async uploadPhotos(id: number, photoUrls: string[]) {
    const existingPost = await this.prisma.post.findUnique({ where: { id } });

    if (!existingPost) {
      throw new Error(`Post with id ${id} not found`);
    }

    return await this.prisma.post.update({
      where: { id },
      data: { photos: { set: photoUrls } },
    });
  }

  async uploadMainPhoto(id: number, mainPhotoUrl: string) {
    return await this.prisma.post.update({
      where: { id },
      data: { main_photo: mainPhotoUrl },
    });
  }

  async addFavorite(id: number) {
    return await this.prisma.post.update({
      where: { id },
      data: { favorite: true },
    });
  }
}
