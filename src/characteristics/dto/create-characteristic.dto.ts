import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateCharacteristicDto {
  @ApiProperty({ example: 'new' })
  @IsString({ message: 'Status must be a string' })
  status: string;

  @ApiProperty({ example: 'apple' })
  @IsString({ message: 'Manufacturer must be a string' })
  manufacturer: string;

  @ApiProperty({ example: 'apple' })
  @IsString({ message: 'Model must be a string' })
  model: string;

  @ApiProperty({ example: 'black' })
  @IsString({ message: 'Color must be a string' })
  color: string;

  @ApiProperty({ example: 2023 })
  @IsNumber({}, { message: 'Created year must be a number' })
  @IsPositive({ message: 'Created year must be a positive number' })
  created_year: number;
}
