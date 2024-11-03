import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { TodoStatus } from '../todo.type';

export type CatDocument = HydratedDocument<Todo>;

@Schema()
export class Todo {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  status: TodoStatus;

  @Prop()
  startDate: string;

  @Prop({})
  endDate: string;

  @Prop({ required: true, parseInt: true })
  taskId: number;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
