import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
// import { FileInterceptor } from '@nestjs/platform-express/multer';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostService } from './post.service';

@ApiTags('Post')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Query('userId') userId: string) {
    await this.postService.recordView(+id, +userId);
    return this.postService.findOne(+id);
  }

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.postService.findOne(+id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }

  ///////////////  ///////////////  ///////////////  ///////////////  ///////////////  ///////////////  ///////////////  ///////////////  ///////////////

  @Post(':id/upload-photo')
  @UseInterceptors(
    FilesInterceptor('photos', 5, {
      storage: diskStorage({
        destination: 'src/uploads/photos',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const extension = file.originalname.split('.').pop();
          callback(null, `${file.fieldname}-${uniqueSuffix}.${extension}`);
        },
      }),
    }),
  )
  async uploadPhotos(
    @Param('id') id: string,
    @UploadedFiles() photos: Array<Express.Multer.File>,
  ) {
    const photoUrls = photos.map((photo) => photo.filename);
    return this.postService.uploadPhotos(+id, photoUrls);
  }

  ///////////////  ///////////////  ///////////////  ///////////////  ///////////////  ///////////////  ///////////////  ///////////////  ///////////////  ///////////////

  @Post(':id/upload-main-photo')
  @UseInterceptors(
    FileInterceptor('main_photo', {
      storage: diskStorage({
        destination: 'src/uploads/main_photo',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const extension = file.originalname.split('.').pop(); //jpg,png
          callback(null, `main_photo-${uniqueSuffix}.${extension}`);
        },
      }),
    }),
  )
  async uploadMainPhoto(
    @Param('id') id: string,
    @UploadedFile() main_photo: Express.Multer.File,
  ) {
    const mainPhotoUrl = main_photo.filename;
    return this.postService.uploadMainPhoto(+id, mainPhotoUrl);
  }

  @Patch(':id/add-favorite')
  async addFavorite(@Param('id') id: string) {
    return this.postService.addFavorite(+id);
  }
}
