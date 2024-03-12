import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreateCharacteristicDto {
  @ApiProperty({ example: 'new' })
  status: string;
  @IsOptional()
  @ApiProperty({ example: 'apple' })
  manufacturer: string;
  @ApiProperty({ example: 'apple' })
  model: string;
  @ApiProperty({ example: 'black' })
  color: string;
  @ApiProperty({ example: 2023 })
  created_year: number;
}
