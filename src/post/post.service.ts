import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreatePostDto) {
    try {
      return await this.prisma.post.create({ data });
    } catch (error) {
      // Handle specific error types or log the error
      console.error(`Error creating post: ${error.message}`);
      throw new Error('Unable to create post');
    }
  }

  async findAll() {
    try {
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
    } catch (error) {
      console.error(`Error fetching posts: ${error.message}`);
      throw new Error('Unable to fetch posts');
    }
  }

  async findOne(id: number) {
    try {
      return await this.prisma.post.findFirst({ where: { id } });
    } catch (error) {
      console.error(`Error fetching post by id ${id}: ${error.message}`);
      throw new NotFoundException(`Post with id ${id} not found`);
    }
  }

  async update(id: number, data: UpdatePostDto) {
    try {
      return await this.prisma.post.update({ where: { id }, data });
    } catch (error) {
      console.error(`Error updating post with id ${id}: ${error.message}`);
      throw new Error('Unable to update post');
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.post.delete({ where: { id } });
    } catch (error) {
      console.error(`Error deleting post with id ${id}: ${error.message}`);
      throw new Error('Unable to delete post');
    }
  }

  async uploadPhotos(id: number, photoUrls: string[]) {
    try {
      const existingPost = await this.prisma.post.findUnique({ where: { id } });

      if (!existingPost) {
        throw new NotFoundException(`Post with id ${id} not found`);
      }

      return await this.prisma.post.update({
        where: { id },
        data: { photos: { set: photoUrls } },
      });
    } catch (error) {
      console.error(
        `Error uploading photos for post with id ${id}: ${error.message}`,
      );
      throw new Error('Unable to upload photos');
    }
  }

  async uploadMainPhoto(id: number, mainPhotoUrl: string) {
    try {
      return await this.prisma.post.update({
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

  async addFavorite(id: number) {
    try {
      return await this.prisma.post.update({
        where: { id },
        data: { favorite: true },
      });
    } catch (error) {
      console.error(
        `Error adding post with id ${id} to favorites: ${error.message}`,
      );
      throw new Error('Unable to add to favorites');
    }
  }
}
