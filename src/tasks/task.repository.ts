import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { Injectable } from '@nestjs/common';

@Injectable() // Make it injectable for dependency injection
export class TaskRepository extends Repository<Task> {}
