import { Controller, Get } from '@nestjs/common';
import { TasksService } from 'modules/task/task.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Get()
  async findAll() {
    const tasks = await this.taskService.findAll();
    return tasks;
  }
}
