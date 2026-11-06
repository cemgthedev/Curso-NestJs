import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  @IsNotEmpty()
  readonly title!: string;

  @IsString()
  @IsNotEmpty()
  readonly content!: string;

  @IsNumber()
  @IsNotEmpty()
  readonly fromId!: number;

  @IsNumber()
  @IsNotEmpty()
  readonly toId!: number;
}
