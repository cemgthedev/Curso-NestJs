import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Animal } from 'entities/animal.entity';
import { CreateAnimalDto } from 'modules/animal/dto/create-animal.dto';
import { UpdateAnimalDto } from 'modules/animal/dto/update-animal.dto';
import { Repository } from 'typeorm';

@Injectable()
export class AnimalsService {
  constructor(
    @InjectRepository(Animal) private animalRepository: Repository<Animal>,
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
