import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  // API - Create New Task
  async create(createTaskDto: CreateTaskDto, userId: string) {
    const data = await this.prisma.task.create({
      data: {
        title: createTaskDto.title,
        userId: userId, // Injected from token
      },
    });
    return { message: 'Task created successfully', data };
  }

  // API - Get All Tasks
  async findAll(userId: string) {
    const data = await this.prisma.task.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
    return { message: 'Tasks retrieved successfully', data };
  }

  // API - Get Single Task
  async findOne(id: string, userId: string) {
    const task = await this.prisma.task.findUnique({ where: { id } });
    
    // Security check: Does this task exist and belong to the user?
    if (!task || task.userId !== userId) {
      throw new NotFoundException(`Task not found`);
    }
    
    return { message: 'Task found', data: task };
  }

  // API - Update Task
  async update(id: string, updateTaskDto: UpdateTaskDto, userId: string) {
    // Ensure the task belongs to the user before updating
    await this.findOne(id, userId); 

    const data = await this.prisma.task.update({
      where: { id },
      data: updateTaskDto,
    });
    return { message: 'Task updated successfully', data };
  }

  // API - Delete Task
  async remove(id: string, userId: string) {
    await this.findOne(id, userId); 

    await this.prisma.task.delete({ where: { id } });

    return { message: 'Task deleted successfully', data: null };
  }
}