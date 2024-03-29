import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber, MinLength } from 'class-validator';

export class SignupAuthDto {
  @ApiProperty({
    description: 'name of User ',
    example: 'Sherali',
  })
  first_name: string;
  @ApiProperty({
    description: 'surname of User ',
    example: 'Karimov',
  })
  last_name: string;

  @ApiProperty({
    description: 'User phone number',
    example: '+998931234284',
  })
  @IsNotEmpty({ message: 'Phone number cannot be empty' })
  @IsPhoneNumber(null, { message: 'Invalid phone number format' })
  phone: string;

  @ApiProperty({
    description: 'User password',
    example: 'strongPassword123',
  })
  @IsNotEmpty({ message: 'Password cannot be empty' })
  @MinLength(5, { message: 'Password must be at least 8 characters long' })
  password: string;

  @ApiProperty({
    description: 'User password',
    example: 'strongPassword123',
  })
  @IsNotEmpty({ message: 'Confirm Password cannot be empty' })
  @MinLength(5, {
    message: 'Confirm Password must be at least 8 characters long',
  })
  confirm_password: string;
}
