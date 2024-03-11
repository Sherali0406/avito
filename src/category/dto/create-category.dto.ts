import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ example: 'cars' })
  name: string;

  @ApiProperty({ example: 1, required: false })
  parentId?: number; // Allow parentId to be optional
}
