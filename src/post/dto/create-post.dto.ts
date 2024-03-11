import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({ example: 'mac m2 pro' })
  title: string;

  @ApiProperty({ example: 'well designed' })
  subtitle: string;

  @ApiProperty({ example: false })
  favorite: boolean;

  @ApiProperty({ example: 'battery cycle:90, color:gray' })
  characteristics: string;

  @ApiProperty({ example: 'it used only 6 months' })
  description: string;

  @ApiProperty({ example: 'no-main.png' })
  main_photo: string;

  @ApiProperty({ example: ['no-photos.png'] })
  photos: string[];

  @ApiProperty({ example: 1 })
  user_id: number;

  @ApiProperty({ example: 1 })
  region_id: number;

  @ApiProperty({ example: 1 })
  category_id: number;
}
