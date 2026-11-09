import { Injectable, NotFoundException, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create.user';
import { UpdateUserDto } from './dto/update.user';

/**
 * Scope.DEFAULT: O provider é instanciado uma vez (padrão singleton)
 * Scope.REQUEST: O provider é instanciado a cada requisição
 * Scope.TRANSIENT: O provider é instanciado para cada classe onde foi injetado
 */
@Injectable({ scope: Scope.DEFAULT })
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
    const users = await this.usersRepository.find({
      relations: ['sentMessages', 'receivedMessages'],
      order: { createdAt: 'DESC' },
    });
    return users;
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['sentMessages', 'receivedMessages'],
    });
    if (!user) throw new NotFoundException(`User with id ${id} not found`);

    return `User #${id}: ${JSON.stringify(user)}`;
  }

  async update(id: number, body: UpdateUserDto) {
    const updatedUser = await this.usersRepository.preload({ id, ...body });
    if (!updatedUser)
      throw new NotFoundException(`User with id ${id} not found`);

    const user = await this.usersRepository.save(updatedUser);

    return `User #${id} updated: ${JSON.stringify(user)}`;
  }

  async remove(id: number) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException(`User with id ${id} not found`);

    await this.usersRepository.remove(user);

    return `User #${id} deleted.`;
  }
}

/**
 * Exemplo de classe com dados mockados
 */
@Injectable()
export class UsersServiceMock {
  async create(body: CreateUserDto) {
    return `User created`;
  }

  async findAll() {
    return [];
  }

  async findOne(id: number) {
    return `User #${id}`;
  }

  async update(id: number, body: UpdateUserDto) {
    return `User #${id} updated: ${JSON.stringify(body)}`;
  }

  async remove(id: number) {
    return `User #${id} deleted.`;
  }
}
