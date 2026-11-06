import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimalsModule } from 'modules/animal/animals.module';
import { ProductModule } from 'modules/products/products.module';
import { SkillsModule } from 'modules/skills/skills.module';
import { TaskModule } from 'modules/task/task.module';
import { UsersModule } from 'modules/users/users.module';
import { MessagesModule } from '../modules/messages/messages.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'postgres',
      username: 'postgres',
      password: '12345678',
      autoLoadEntities: true, // carrega as entidades automaticamente
      synchronize: true, // cria as tabelas automaticamente. obs: não usar em produção
    }),
    UsersModule,
    MessagesModule,
    AnimalsModule,
    TaskModule,
    ProductModule,
    SkillsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
