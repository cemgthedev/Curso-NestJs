import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'entities/user.entity';
import { UsersController } from 'modules//users/users.controller';
import { UsersService } from 'modules/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], // Exporta o UsersService para que outros módulos possam utilizá-lo
})
export class UsersModule {}
