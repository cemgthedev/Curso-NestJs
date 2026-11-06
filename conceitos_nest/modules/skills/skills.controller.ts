import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateSkillDto } from 'modules/skills/dto/create-skill.dto';
import { QuerySkillDto } from 'modules/skills/dto/query-skill.dto';
import { UpdateSkillDto } from 'modules/skills/dto/update-skill.dto';
import { SkillsService } from 'modules/skills/skills.service';

@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Get()
  async findAll() {
    const skills = await this.skillsService.findAll();
    return skills;
  }

  @Get('query')
  async querySkills(@Query() options: QuerySkillDto) {
    const skills = await this.skillsService.query(options);
    return skills;
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: string) {
    const skill = await this.skillsService.findOne(id);
    return skill;
  }

  @Post()
  async create(@Body() skill: CreateSkillDto) {
    const createdSkill = await this.skillsService.create(skill);
    return createdSkill;
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: string,
    @Body() skill: UpdateSkillDto,
  ) {
    const updatedSkill = await this.skillsService.update(id, skill);
    return updatedSkill;
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: string) {
    await this.skillsService.delete(id);
    return { message: `Skill with id ${id} has been deleted` };
  }
}
