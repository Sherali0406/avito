import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'first name of  user', example: 'Karimov' })
  first_name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'last name of  user', example: 'Sherali' })
  last_name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'phone number of  user',
    example: '+998939992211',
  })
  phone: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'password of  user',
    example: 'strongPassword',
  })
  password: string;

  @ApiProperty({
    description: 'role of  user',
    example: 'user',
  })
  role: string;

  @ApiProperty({
    description: 'address of  user',
    example: 'qorasuv ',
  })
  address: string;
}
