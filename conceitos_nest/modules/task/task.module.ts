import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'entities/task.entity';
import { TasksController } from 'modules/task/task.controller';
import { TasksService } from 'modules/task/task.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TaskModule {}
