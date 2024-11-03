import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

export enum TodoStatus {
  WORKING = 'WORKING',
  DONE = 'DONE',
  PENDING = 'PENDING',
}
@ObjectType('Todos')
export class TodoType {
  @Field((type) => String)
  id: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field({ defaultValue: TodoStatus.PENDING })
  status: TodoStatus;

  @Field({ nullable: true })
  startDate: string;

  @Field({ nullable: true })
  endDate: string;

  @Field((type) => Int)
  taskId: number;
}
