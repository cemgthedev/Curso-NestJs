import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from 'modules/task/dto/create.task';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {}
