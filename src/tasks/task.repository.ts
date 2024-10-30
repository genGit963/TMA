import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './get-tasks-filter.dto';

@Injectable() // Make it injectable for dependency injection
export class TaskRepository extends Repository<Task> {
  async getTasks(): Promise<Task[]> {
    const query = this.createQueryBuilder('task');
    const tasks = await query.getMany();
    return tasks;
  }
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    console.log(createTaskDto);
    const task = new Task();
    const { title, description } = createTaskDto;
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    const saveTask = await task.save();
    return saveTask;
  }
}
