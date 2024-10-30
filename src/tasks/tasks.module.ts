import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]), // Importing TypeORM module to use Task entity
  ],
  controllers: [
    TasksController, // Registering the controller to handle HTTP requests related to tasks
  ],
  providers: [TasksService, TaskRepository],
})
export class TasksModule {}
