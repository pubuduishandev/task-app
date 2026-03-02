import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto {
  isCompleted?: boolean;
  title?: string;
}
