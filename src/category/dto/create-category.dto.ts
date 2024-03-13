import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsPositive, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'cars' })
  @IsString({ message: 'Name must be a string' })
  name: string;

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @IsInt({ message: 'Parent ID must be an integer' })
  @IsPositive({ message: 'Parent ID must be a positive integer' })
  parentId?: number;

  @ApiProperty({ example: 'no-main.png' })
  @IsNotEmpty({ message: 'Main photo cannot be empty' })
  main_photo: string;
}
