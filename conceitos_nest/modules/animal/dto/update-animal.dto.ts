import { PartialType } from '@nestjs/mapped-types';
import { CreateAnimalDto } from 'modules/animal/dto/create-animal.dto';

export class UpdateAnimalDto extends PartialType(CreateAnimalDto) {}
