import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ 
    example: 'Complete NestJS Documentation', 
    description: 'The title of the task' 
  })
  title: string;

  // We keep this for internal logic, but we hide it from the API docs
  // because it's handled by the token.
  userId: string;
}