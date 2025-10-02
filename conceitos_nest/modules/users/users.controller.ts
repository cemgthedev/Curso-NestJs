import { Controller, Get } from '@nestjs/common';
import { UsersService } from 'modules/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly appService: UsersService) {}

  @Get('/hello')
  getHello(): string {
    return this.appService.getHello();
  }
}
