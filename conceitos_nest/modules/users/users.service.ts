import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create.user';
import { UpdateUserDto } from './dto/update.user';

export interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable()
export class UsersService {
  private users: User[] = [];
  private id = 0;

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    return `User #${id}: ${JSON.stringify(user)}`;
  }

  create(body: CreateUserDto) {
    this.id++;
    this.users.push({ ...body, id: this.id });

    return `User created: ${JSON.stringify(body)}`;
  }

  update(id: number, body: UpdateUserDto) {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    this.users = this.users.map((user) => {
      if (user.id === id) return { ...user, ...body };
      return user;
    });

    return `User #${id} updated: ${JSON.stringify(body)}`;
  }

  remove(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    this.users = this.users.filter((user) => user.id !== Number(id));

    return `User #${id} deleted.`;
  }
}
