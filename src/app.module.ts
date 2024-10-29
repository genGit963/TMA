import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmconfig } from './config/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmconfig), TasksModule],
})
export class AppModule {}
