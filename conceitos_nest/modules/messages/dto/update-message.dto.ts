import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateMessageDto } from './create-message.dto';

export class UpdateMessageDto extends PartialType(CreateMessageDto) {
  @IsNumber()
  @IsNotEmpty()
  readonly fromId!: number;

  @IsNumber()
  @IsNotEmpty()
  readonly toId!: number;
}
