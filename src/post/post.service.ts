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
      console.error(`Error creating post: ${error.message}`);
      throw new Error('Unable to create post');
    }
  }

  async findAllPost() {
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
          characteristics: true,
        },
      });
    } catch (error) {
      console.error(`Error fetching posts: ${error.message}`);
      throw new Error('Unable to fetch posts');
    }
  }
  async filterPosts(filterOptions: any) {
    try {
      const whereOptions: any = {};

      if (filterOptions.category) {
        const categoryId = parseInt(filterOptions.category, 10);
        if (!isNaN(categoryId)) {
          whereOptions.category_id = categoryId;
        }
      }

      if (filterOptions.minPrice && filterOptions.maxPrice) {
        const minPrice = parseFloat(filterOptions.minPrice);
        const maxPrice = parseFloat(filterOptions.maxPrice);
        if (!isNaN(minPrice) && !isNaN(maxPrice)) {
          whereOptions.price = {
            gte: minPrice,
            lte: maxPrice,
          };
        }
      }

      return await this.prisma.post.findMany({
        where: whereOptions,
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
          characteristics: true,
        },
      });
    } catch (error) {
      console.error(`Error filtering posts: ${error.message}`);
      throw new Error('Unable to filter posts');
    }
  }

  async findOne(id: number) {
    try {
      if (isNaN(id) || id <= 0) {
        throw new Error('Invalid post ID');
      }

      const existingPost = await this.prisma.post.findFirst({
        where: {
          id,
        },
      });

      if (!existingPost) {
        throw new NotFoundException(`Post with id ${id} not found`);
      }

      return existingPost;
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

  async recordView(postId: number, userId: number) {
    try {
      const existingView = await this.prisma.postView.findUnique({
        where: {
          postId_userId: {
            postId,
            userId,
          },
        },
      });

      if (!existingView) {
        await this.prisma.postView.create({
          data: {
            postId,
            userId,
          },
        });

        await this.prisma.post.update({
          where: { id: postId },
          data: { viewsCount: { increment: 1 } },
        });
      }
    } catch (error) {
      console.error(`Error recording view: ${error.message}`);
      throw new Error('Unable to record view');
    }
  }
}
