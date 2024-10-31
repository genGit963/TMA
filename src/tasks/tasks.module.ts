import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    AuthModule, // Importing TypeORM module to use Task entity
  ],
  controllers: [
    TasksController, // Registering the controller to handle HTTP requests related to tasks
  ],
  providers: [TasksService, TaskRepository],
})
export class TasksModule {}
