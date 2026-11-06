import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsTimeZone,
} from 'class-validator';
import { Level } from 'modules/skills/enum/level.enum';

export class CreateSkillDto {
  @IsString()
  @IsNotEmpty()
  readonly title!: string;

  @IsEnum(Level)
  @IsNotEmpty()
  readonly level!: Level;

  @IsTimeZone()
  @IsNotEmpty()
  readonly createdAt!: Date;

  @IsTimeZone()
  @IsOptional()
  readonly updatedAt?: Date;
}
