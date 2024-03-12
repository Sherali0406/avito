import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt, IsPositive } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'cars' })
  @IsString({ message: 'Name must be a string' })
  name: string;

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @IsInt({ message: 'Parent ID must be an integer' })
  @IsPositive({ message: 'Parent ID must be a positive integer' })
  parentId?: number;
}
