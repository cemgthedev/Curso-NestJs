import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Level } from 'modules/skills/enum/level.enum';

export class QuerySkillDto {
  @IsString()
  @IsOptional()
  readonly title?: string;

  @IsEnum(Level)
  @IsOptional()
  readonly level?: Level;
}
