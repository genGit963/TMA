import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TasksService {
  constructor(
    private readonly taskRepository: TaskRepository, // Inject the Task entity
  ) {}

  async getTasks(): Promise<Task[]> {
    return await this.taskRepository.find();
  }

  // async getTasksFilter(filterDto: GetTasksFilterDto): Promise<Task[]> {
  //   const { status, search } = filterDto;
  //   let tasks: Task[] = await this.getTasks();
  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }
  //   if (search) {
  //     tasks = tasks.filter(
  //       (task) =>
  //         task.title.includes(search) || task.description.includes(search),
  //     );
  //   }
  //   return tasks;
  // }

  async getTasksFilter(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return await this.taskRepository.getTasks(filterDto);
  }

  async getTaskById(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException('Task not found !!');
    }
    return task;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }

  // async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
  //   const task = new Task();

  //   const { title, description } = createTaskDto;

  //   task.title = title;
  //   task.description = description;
  //   task.status = TaskStatus.OPEN;

  //   const saveTask = await task.save();

  //   return saveTask;
  // }

  async deleteTask(id: number): Promise<Task> {
    const checkTaskExist: Task = await this.getTaskById(id); // info: error handling reuseability
    if (checkTaskExist) {
      await this.taskRepository.delete(checkTaskExist.id);
      return checkTaskExist;
    }
  }

  async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
    const task: Task = await this.getTaskById(id); // info: error handling reuseability
    task.status = status;
    const updatedTask = await task.save();

    return updatedTask;
  }
}
