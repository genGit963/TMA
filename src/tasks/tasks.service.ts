import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { UserEntity } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
  private logger = new Logger('TasksService');
  constructor(
    private readonly taskRepository: TaskRepository, // Inject the Task entity
  ) {}

  async getTasks(): Promise<Task[]> {
    return await this.taskRepository.find();
  }

  async getTasksFilter(
    filterDto: GetTasksFilterDto,
    user: UserEntity,
  ): Promise<Task[]> {
    return await this.taskRepository.getTasks(filterDto, user);
  }

  async getTaskById(id: number, user: UserEntity): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id, userId: user.id },
    });
    if (!task) {
      throw new NotFoundException('Task not found !!');
    }
    return task;
  }

  async createTask(
    createTaskDto: CreateTaskDto,
    user: UserEntity,
  ): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto, user);
  }

  async deleteTask(id: number, user: UserEntity): Promise<Task> {
    const checkTaskExist: Task = await this.getTaskById(id, user); // info: error handling reuseability
    if (checkTaskExist) {
      await this.taskRepository.delete(checkTaskExist.id);
      return checkTaskExist;
    }
  }

  async updateTaskStatus(
    id: number,
    user: UserEntity,
    status: TaskStatus,
  ): Promise<Task> {
    const task: Task = await this.getTaskById(id, user); // info: error handling reuseability
    task.status = status;
    const updatedTask = await task.save();

    return updatedTask;
  }
}
