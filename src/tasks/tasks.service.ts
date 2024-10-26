import { Injectable } from '@nestjs/common';
import { Task } from './tasks.model';

@Injectable()
export class TasksService {
  private tasks: Array<Task> = [];

  getTasks(): Task[] {
    return this.tasks;
  }
}
