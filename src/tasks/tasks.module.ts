import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]), // Importing TypeORM module to use Task entity
  ],
  controllers: [
    TasksController, // Registering the controller to handle HTTP requests related to tasks
  ],
  providers: [
    { provide: 'TaskRepository', useClass: TaskRepository }, // Providing a custom repository for dependency injection
    TasksService, // Registering the service that contains business logic related to tasks
  ],
  exports: [
    TasksService, // Exporting TasksService for use in other modules
  ],
})
export class TasksModule {}
