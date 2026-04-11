import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create.user';
import { UpdateUserDto } from './dto/update.user';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(body: CreateUserDto) {
    const newUser = this.usersRepository.create(body);
    const user = await this.usersRepository.save(newUser);

    return `User created: ${JSON.stringify(user)}`;
  }

  async findAll() {
    const users = await this.usersRepository.find();
    return users;
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    return `User #${id}: ${JSON.stringify(user)}`;
  }

  async update(id: number, body: UpdateUserDto) {
    const updatedUser = await this.usersRepository.preload({ id, ...body });
    if (!updatedUser)
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    const user = await this.usersRepository.save(updatedUser);

    return `User #${id} updated: ${JSON.stringify(user)}`;
  }

  async remove(id: number) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    await this.usersRepository.remove(user);

    return `User #${id} deleted.`;
  }
}
