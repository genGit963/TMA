import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TodoStatus, TodoType } from './todo.type';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodoServices } from './todo.service';
import { Todo } from './schema/todo.schema';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Resolver(() => TodoType)
@UseGuards(AuthGuard('jwt'))
export class TodoResolver {
  constructor(private readonly todoServices: TodoServices) {}

  @Query(() => [TodoType])
  getTodoList() {
    const todo = {
      id: 3,
      title: 'This is the title',
      description: 'This is des',
      status: TodoStatus.PENDING,
      startDate: new Date().toISOString(),
      endDate: null,
      taskId: 2,
    };
    return this.todoServices.findTodos();
  }

  @Query(() => TodoType)
  getTodo(@Args('id') id: string): Promise<Todo> {
    return this.todoServices.findTodoById(id);
  }

  @Mutation(() => TodoType)
  createTodo(@Args('todo') createTodoDto: CreateTodoDto) {
    console.log('createTodoDto: ', createTodoDto);
    return this.todoServices.createTodo(createTodoDto);
  }
}
