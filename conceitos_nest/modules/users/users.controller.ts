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
import { UsersService } from 'modules/users/users.service';
import { CreateUserDto } from './dto/create.user';
import { UpdateUserDto } from './dto/update.user';

@Controller('users')
export class UsersController {
  constructor(private readonly appService: UsersService) {}

  @Get()
  findAll() {
    return this.appService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.appService.findOne(id);
  }

  @Post()
  create(@Body() body: CreateUserDto) {
    return this.appService.create(body);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateUserDto) {
    return this.appService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.appService.remove(id);
  }
}
