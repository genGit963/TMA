import { Field, InputType, Int } from '@nestjs/graphql';
import { IsOptional, Length, MinLength } from 'class-validator';

@InputType()
export class CreateTodoDto {
  @Field()
  @MinLength(1)
  readonly title: string;

  @Field()
  @MinLength(1)
  readonly description: string;

  @Field({ nullable: true })
  readonly startDate?: string;

  @Field({ nullable: true })
  readonly endDate?: string;

  @Field()
  @MinLength(1)
  readonly taskId: number;
}
