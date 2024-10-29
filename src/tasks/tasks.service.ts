import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { MongoRepository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: TaskRepository, // Inject the Task entity
  ) {}

  // getTasks(): Task[] {
  //   return this.tasks;
  // }
  // getTasksFilter(filterDto: GetTasksFilterDto): Task[] {
  //   const { status, search } = filterDto;
  //   // console.log(filterDto);
  //   // cache tasks
  //   let tasks: Task[] = this.getTasks();
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

  async getTaskById(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException('Task not found !!');
    }
    return task;
  }

  // getTaskById(id: string): Task {
  //   const task = this.tasks.find((task) => task.id === id);
  //   if (!task) {
  //     throw new NotFoundException(`Task isn't found !`);
  //   }
  //   return task;
  // }

  // createTask(createTaskDto: CreateTaskDto): Task {
  //   const { title, description } = createTaskDto;
  //   const task: Task = {
  //     id: uuidv4(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };
  //   this.tasks.push(task);
  //   return task;
  // }
  // deleteTask(id: string): Task {
  //   const checkTaskExist: Task = this.getTaskById(id); // info: error handling reuseability
  //   if (checkTaskExist) {
  //     this.tasks = this.tasks.filter((task) => task.id !== checkTaskExist.id);
  //     return checkTaskExist;
  //   }
  // }
  // updateTaskStatus(id: string, status: TaskStatus): Task {
  //   const task: Task = this.getTaskById(id); // info: error handling reuseability
  //   task.status = status;
  //   return task;
  // }
}
