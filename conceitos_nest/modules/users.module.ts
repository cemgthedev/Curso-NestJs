import { Module } from '@nestjs/common';
import { UsersController } from 'modules/users.controller';
import { UsersService } from 'modules/users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [],
})
export class UsersModule {}
