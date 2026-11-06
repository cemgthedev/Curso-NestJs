import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Skill } from 'entities/skill.entity';
import { CreateSkillDto } from 'modules/skills/dto/create-skill.dto';
import { QuerySkillDto } from 'modules/skills/dto/query-skill.dto';
import { UpdateSkillDto } from 'modules/skills/dto/update-skill.dto';
import { Repository } from 'typeorm';

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>,
  ) {}

  async query(options: QuerySkillDto): Promise<Skill[]> {
    const { title, level } = options;

    const queryBuilder = this.skillRepository.createQueryBuilder('skill');

    if (title) {
      queryBuilder.andWhere('skill.title ILIKE :title', {
        title: `%${title}%`,
      });
    }
    if (level) {
      queryBuilder.andWhere('skill.level = :level', { level });
    }

    return queryBuilder.getMany();
  }

  async findAll(): Promise<Skill[]> {
    return this.skillRepository.find();
  }

  async findOne(id: string): Promise<Skill> {
    const skill = await this.skillRepository.findOne({ where: { id } });

    if (!skill) {
      throw new NotFoundException(`Skill with id ${id} not found`);
    }

    return skill;
  }

  async create(skill: CreateSkillDto): Promise<Skill> {
    return this.skillRepository.save(skill);
  }

  async update(id: string, skill: UpdateSkillDto): Promise<Skill> {
    const existingSkill = await this.findOne(id);

    if (!existingSkill) {
      throw new NotFoundException(`Skill with id ${id} not found`);
    }

    Object.assign(existingSkill, skill);

    return this.skillRepository.save(existingSkill);
  }

  async delete(id: string): Promise<Skill> {
    const existingSkill = await this.findOne(id);

    if (!existingSkill) {
      throw new NotFoundException(`Skill with id ${id} not found`);
    }

    return this.skillRepository.remove(existingSkill);
  }
}
