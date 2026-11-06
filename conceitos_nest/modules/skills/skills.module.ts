import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Skill } from 'entities/skill.entity';
import { SkillsController } from 'modules/skills/skills.controller';
import { SkillsService } from 'modules/skills/skills.service';

@Module({
  imports: [TypeOrmModule.forFeature([Skill])],
  controllers: [SkillsController],
  providers: [SkillsService],
})
export class SkillsModule {}
