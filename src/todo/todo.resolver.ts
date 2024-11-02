import { Query, Resolver } from '@nestjs/graphql';
import { TodoStatus, TodoType } from './todo.type';

@Resolver(() => TodoType)
export class TodoResolver {
  @Query(() => TodoType)
  todo() {
    const todo: TodoType = {
      id: 'dkaf',
      title: 'This is the title',
      description: 'This is des',
      status: TodoStatus.PENDING,
      startDate: new Date().toISOString(),
      endDate: null,
    };
    return todo;
  }
}
