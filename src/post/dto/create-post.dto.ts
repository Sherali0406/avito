import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({ example: 'mac m2 pro' })
  title: string;

  @ApiProperty({ example: 'well designed' })
  subtitle: string;

  @ApiProperty({ example: true })
  favorite: boolean;

  @ApiProperty({ example: 'battery cycle:90, color:gray' })
  characteristics: string;

  @ApiProperty({ example: 'it used only 6 months' })
  description: string;

  @ApiProperty({ example: 'Toshkent Mirabad' })
  address: string;

  @ApiProperty({ example: 'no-main.png' })
  main_photo: string;

  @ApiProperty({ example: ['no-photos.png'] })
  photos: string[];

  @ApiProperty({ example: 1 })
  user_id: number;
}
