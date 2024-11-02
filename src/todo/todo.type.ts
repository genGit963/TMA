import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Todos')
export class TodoType {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field({ nullable: true })
  status: TodoStatus;

  @Field({ nullable: true })
  startDate: string;

  @Field({ nullable: true })
  endDate: string;
}

export enum TodoStatus {
  WORKING = 'WORKING',
  DONE = 'DONE',
  PENDING = 'PENDING',
}
