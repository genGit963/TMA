import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { TaskStatus } from '../task-status.enum';

// custom pipe
export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedTaskStatuses = [
    TaskStatus.DONE,
    TaskStatus.IN_PROGRESS,
    TaskStatus.OPEN,
  ];

  transform(value: any, metadata: ArgumentMetadata) {
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} : is not valid as status !`);
    }
    return value;
  }

  private isStatusValid(status: any) {
    return this.allowedTaskStatuses.includes(status);
  }
}
