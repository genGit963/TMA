import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Array<Task> = [
    {
      id: '8344c57b-991f-4c33-893a-d869a5494c88',
      title: 'Task 1',
      description: 'working task1 data',
      status: TaskStatus.DONE,
    },
    {
      id: 'fda3157d-9e24-4d58-8262-7757c6b34db4',
      title: 'filter and search',
      description: 'working to filtering and searching data 1 ',
      status: TaskStatus.IN_PROGRESS,
    },
    {
      id: '78c105d3-3861-463e-88a7-cdd7a512fbb5',
      title: 'fi 2',
      description: 'working t searching data 12',
      status: TaskStatus.OPEN,
    },
    {
      id: '11daccec-af8a-4675-8fd2-f2158c2630fa',
      title: 'filter and search 3',
      description: 'working to filtering and searching data 123',
      status: TaskStatus.OPEN,
    },
  ];

  getTasks(): Task[] {
    return this.tasks;
  }

  getTasksFilter(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;
    // console.log(filterDto);
    // cache tasks
    let tasks: Task[] = this.getTasks();

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter(
        (task) =>
          task.title.includes(search) || task.description.includes(search),
      );
    }

    return tasks;
  }

  getTaskById(id: string): Task {
    const task = this.tasks.find((task) => task.id === id);
    if (!task) {
      throw new NotFoundException(`Task isn't found !`);
    }
    return task;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuidv4(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }

  deleteTask(id: string): Task {
    const checkTaskExist: Task = this.getTaskById(id); // info: error handling reuseability
    if (checkTaskExist) {
      this.tasks = this.tasks.filter((task) => task.id !== checkTaskExist.id);
      return checkTaskExist;
    }
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    const task: Task = this.getTaskById(id); // info: error handling reuseability
    task.status = status;
    return task;
  }
}
