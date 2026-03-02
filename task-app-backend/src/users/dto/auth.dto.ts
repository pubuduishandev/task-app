import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'Pubudu' })
  firstName!: string;

  @ApiProperty({ example: 'Ishan' })
  lastName!: string;

  @ApiProperty({ example: 'pubudu@example.com' })
  email!: string;

  @ApiProperty({ example: 'password123', description: 'Minimum 6 characters' })
  password!: string;
}

export class LoginDto {
  @ApiProperty({ example: 'pubudu@example.com' })
  email!: string;

  @ApiProperty({ example: 'password123' })
  password!: string;
}