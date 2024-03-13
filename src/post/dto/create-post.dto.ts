import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ example: 'mac m2 pro' })
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title cannot be empty' })
  title: string;

  @ApiProperty({ example: 'well designed' })
  @IsString({ message: 'Subtitle must be a string' })
  @IsNotEmpty({ message: 'Subtitle cannot be empty' })
  subtitle: string;

  @ApiProperty({ example: false })
  @IsBoolean({ message: 'Favorite must be a boolean' })
  favorite: boolean;

  @ApiProperty({ example: 'it used only 6 months' })
  @IsString({ message: 'Description must be a string' })
  @IsNotEmpty({ message: 'Description cannot be empty' })
  description: string;

  @ApiProperty({ example: 'no-main.png' })
  @IsNotEmpty({ message: 'Main photo cannot be empty' })
  main_photo: string;

  @ApiProperty({ example: ['no-photos.png'] })
  @IsArray({ message: 'Photos must be an array' })
  photos: string[];

  @ApiProperty({ example: '40-uy' })
  @IsString({ message: 'Address must be a string' })
  @IsNotEmpty({ message: 'Address cannot be empty' })
  address: string;

  @ApiProperty({ example: '1400' })
  @IsNotEmpty({ message: 'Price cannot be empty' })
  price: number;

  @ApiProperty({ example: '5' })
  @IsNumber({}, { message: 'Rating must be a number' })
  @IsPositive({ message: 'Rating must be a positive number' })
  @Min(1, { message: 'Rating must be at least 1' })
  @Max(5, { message: 'Rating must be at most 5' })
  rating: number;

  @ApiProperty({ example: 'good thing' })
  @IsString({ message: 'Review must be a string' })
  review: string;

  @ApiProperty({ example: 1 })
  @IsInt({ message: 'User ID must be an integer' })
  @IsPositive({ message: 'User ID must be a positive integer' })
  user_id: number;

  @ApiProperty({ example: 1 })
  @IsInt({ message: 'Region ID must be an integer' })
  @IsPositive({ message: 'Region ID must be a positive integer' })
  region_id: number;

  @ApiProperty({ example: 1 })
  @IsInt({ message: 'Category ID must be an integer' })
  @IsPositive({ message: 'Category ID must be a positive integer' })
  category_id: number;

  @ApiProperty({ example: 1 })
  @IsInt({ message: 'Characteristics ID must be an integer' })
  @IsPositive({ message: 'Characteristics ID must be a positive integer' })
  characteristics_id: number;

  viewsCount: number;
} 
