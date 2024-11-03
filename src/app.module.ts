import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmconfig } from './config/typeorm.config';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import * as config from 'config';
import { TodoModule } from './todo/todo.module';
import { MongooseModule } from '@nestjs/mongoose';
import { StaffModule } from './staff/staff.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      // typePaths: ['./**/*.graphql'],
    }),
    MongooseModule.forRoot(
      process.env.MONGODB_URL || config.get('mongodb.uri'),
    ),
    TypeOrmModule.forRoot(typeOrmconfig),
    TasksModule,
    AuthModule,
    TodoModule,
    StaffModule,
  ],
})
export class AppModule {}
