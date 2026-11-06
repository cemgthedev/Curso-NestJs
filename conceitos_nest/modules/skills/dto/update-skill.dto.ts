import { PartialType } from '@nestjs/mapped-types';
import { CreateSkillDto } from 'modules/skills/dto/create-skill.dto';

export class UpdateSkillDto extends PartialType(CreateSkillDto) {}
