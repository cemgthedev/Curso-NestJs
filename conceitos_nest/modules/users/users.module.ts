import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'entities/user.entity';
import { UsersController } from 'modules//users/users.controller';
import { MessagesModule } from 'modules/messages/messages.module';
import { UsersService } from 'modules/users/users.service';

// exemplo de dependência circular com MessagesModule
@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => MessagesModule)],
  controllers: [UsersController],
  providers: [
    {
      provide: UsersService, // Token/nome
      useClass: UsersService, // Classe
      //useValue: new UsersServiceMock(), // Valor (usado para mocks em testes)
    },
  ],
  exports: [
    {
      provide: UsersService,
      useClass: UsersService,
    },
  ], // Exporta o UsersService para que outros módulos possam utilizá-lo
})
export class UsersModule {}
