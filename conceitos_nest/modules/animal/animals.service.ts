import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { RegexProtocol } from 'common/regex/regex-protocol.regex';
import {
  ONLY_LOWER_CASE_LETTERS,
  REMOVE_SPACES,
} from 'constants/regex.constants';
import { Animal } from 'entities/animal.entity';
import { CreateAnimalDto } from 'modules/animal/dto/create-animal.dto';
import { UpdateAnimalDto } from 'modules/animal/dto/update-animal.dto';
import { Repository } from 'typeorm';

@Injectable()
export class AnimalsService {
  constructor(
    @InjectRepository(Animal) private animalRepository: Repository<Animal>,
    @Inject(REMOVE_SPACES)
    private readonly removeSpaces: RegexProtocol,
    @Inject(ONLY_LOWER_CASE_LETTERS)
    private readonly onlyLowerCaseLetters: RegexProtocol,
  ) {}

  async create(createAnimalDto: CreateAnimalDto) {
    const newAnimal = this.animalRepository.create(createAnimalDto);
    const animal = await this.animalRepository.save(newAnimal);

    return `Animal created: ${JSON.stringify(animal)}`;
  }

  async findAll() {
    const animals = await this.animalRepository.find();
    return animals;
  }

  async findOne(id: number) {
    const animal = await this.animalRepository.findOne({ where: { id } });

    if (!animal)
      throw new HttpException('Animal not found', HttpStatus.NOT_FOUND);

    console.log('Message: ', `Animal #${id}: ${JSON.stringify(animal)}`);
    console.log(
      'Without spaces: ',
      this.removeSpaces.execute(`Animal #${id}: ${JSON.stringify(animal)}`),
    );
    console.log(
      'Only lower case letters: ',
      this.onlyLowerCaseLetters.execute(
        `Animal #${id}: ${JSON.stringify(animal)}`,
      ),
    );

    return `Animal #${id}: ${JSON.stringify(animal)}`;
  }

  async update(id: number, updateAnimalDto: UpdateAnimalDto) {
    const updatedAnimal = await this.animalRepository.preload({
      id,
      ...updateAnimalDto,
    });

    if (!updatedAnimal)
      throw new HttpException('Animal not found', HttpStatus.NOT_FOUND);

    const animal = await this.animalRepository.save(updatedAnimal);

    return `Animal #${id} updated: ${JSON.stringify(animal)}`;
  }

  async remove(id: number) {
    const animal = await this.animalRepository.findOne({ where: { id } });
    if (!animal)
      throw new HttpException('Animal not found', HttpStatus.NOT_FOUND);

    await this.animalRepository.remove(animal);
    return `This action removes a #${id} animal`;
  }
}
