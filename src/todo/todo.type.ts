import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Todos')
export class TodoType {
  @Field((type) => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  status: TodoStatus;

  @Field()
  startDate: string;

  @Field()
  endDate: string;
}

export enum TodoStatus {
  WORKING = 'WORKING',
  DONE = 'DONE',
  PENDING = 'PENDING',
}
