import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { SimpleMiddleware } from 'common/middlewares/simple.middleware';
import { DBConnectModule } from 'dinamic/db-connect.module';
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
    DBConnectModule.register({
      type: 'test',
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
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SimpleMiddleware).forRoutes({
      path: '*', // Aplica o middleware para todas as rotas
      method: RequestMethod.ALL, // Aplica o middleware para todos os métodos HTTP
    });
  }
}
