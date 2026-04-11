import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { AnimalsService } from 'modules/animal/animals.service';
import { CreateAnimalDto } from 'modules/animal/dto/create-animal.dto';
import { UpdateAnimalDto } from 'modules/animal/dto/update-animal.dto';

@Controller('animals')
export class AnimalsController {
  constructor(private readonly animalsService: AnimalsService) {}

  @Post()
  create(@Body() createAnimalDto: CreateAnimalDto) {
    return this.animalsService.create(createAnimalDto);
  }

  @Get()
  findAll() {
    return this.animalsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.animalsService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAnimalDto: UpdateAnimalDto,
  ) {
    console.log('updateAnimalDto', updateAnimalDto);
    return this.animalsService.update(id, updateAnimalDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.animalsService.remove(id);
  }
}
