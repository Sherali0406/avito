import { ApiProperty } from "@nestjs/swagger";

export class CreateRegionDto {
  @ApiProperty({ example: 'toshkent shaxar' })
  address: string;

  @ApiProperty({ example: 1, required: false })
  parentId?: number;
}
