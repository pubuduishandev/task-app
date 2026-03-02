import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto {
  @ApiProperty({ 
    example: true, 
    description: 'Mark the task as completed or pending',
    required: false 
  })
  isCompleted?: boolean;

  @ApiProperty({ 
    example: 'Updated Task Title', 
    required: false 
  })
  title?: string;
}