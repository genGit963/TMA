import { Injectable } from '@nestjs/common';
import { Todo } from './schema/todo.schema';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodoStatus } from './todo.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TodoServices {
  constructor(@InjectModel(Todo.name) private todoModel: Model<Todo>) {}

  async createTodo(createTodoDto: CreateTodoDto): Promise<Todo> {
    const { title, description, startDate, endDate, taskId } = createTodoDto;
    const todo: Todo = {
      title,
      description,
      startDate,
      endDate,
      status: TodoStatus.PENDING,
      taskId: taskId,
    };
    return await this.todoModel.create(todo);
  }

  async findTodos(): Promise<Todo[]> {
    return await this.todoModel.find();
  }

  async findTodoById(id: string): Promise<Todo> {
    return await this.todoModel.findById(id);
  }
}
