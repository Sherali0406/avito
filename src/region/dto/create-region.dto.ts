import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsPositive, IsString } from 'class-validator';

export class CreateRegionDto {
  @ApiProperty({ example: 'toshkent shaxar' })
  @IsString({ message: 'Address must be a string' })
  address: string;

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @IsInt({ message: 'Parent ID must be an integer' })
  @IsPositive({ message: 'Parent ID must be a positive integer' })
  parentId?: number;
}
