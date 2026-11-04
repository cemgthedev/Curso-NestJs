import { IsEnum, IsNotEmpty, IsString, IsTimeZone } from 'class-validator';
import { Priority } from 'modules/task/enum/priority.enum';
import { Status } from 'modules/task/enum/status.enum';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  readonly title!: string;

  @IsString()
  readonly description?: string;

  @IsEnum(Priority)
  @IsNotEmpty()
  readonly priority!: Priority;

  @IsEnum(Status)
  @IsNotEmpty()
  readonly status!: Status;

  @IsTimeZone()
  readonly dueDate?: string;
}
