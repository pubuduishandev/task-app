import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from '../prisma/prisma.service'; // Ensure this path is correct

@Injectable()
export class TasksService {
  // Inject Prisma to talk to PostgreSQL
  constructor(private readonly prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto) {
    const newTask = await this.prisma.task.create({
      data: {
        title: createTaskDto.title,
        // isCompleted automatically defaults to false from the schema
      },
    });
    return { message: 'Task created successfully', data: newTask };
  }

  async findAll() {
    const tasks = await this.prisma.task.findMany({
      orderBy: { createdAt: 'desc' } // Newest tasks first
    });

    // Check if the array is empty and return your custom message
    if (tasks.length === 0) {
      return { message: 'No tasks found. Create one to get started!', data: [] };
    }

    return { message: 'Tasks retrieved successfully', data: tasks };
  }

  async findOne(id: string) {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      // This automatically throws a 404 Not Found HTTP error
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return { message: 'Task retrieved successfully', data: task };
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    // First, verify the task exists before trying to update it
    await this.findOne(id);

    const updatedTask = await this.prisma.task.update({
      where: { id },
      data: updateTaskDto,
    });

    return { message: 'Task updated successfully', data: updatedTask };
  }

  async remove(id: string) {
    // First, verify the task exists before trying to delete it
    await this.findOne(id);

    await this.prisma.task.delete({
      where: { id },
    });

    return { message: 'Task removed successfully' };
  }
}