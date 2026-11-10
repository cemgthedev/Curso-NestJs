import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
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
import * as Joi from '@hapi/joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (config) => {
        const { error, value } = Joi.object({
          DATABASE_TYPE: Joi.string().valid('postgres').required(),
          DATABASE_HOST: Joi.string().required(),
          DATABASE_PORT: Joi.number().port().required(),
          DATABASE_DATABASE: Joi.string().required(),
          DATABASE_USERNAME: Joi.string().required(),
          DATABASE_PASSWORD: Joi.string().required(),
          DATABASE_TEST_TYPE: Joi.string().valid('postgres').required(),
          DATABASE_TEST_HOST: Joi.string().required(),
          DATABASE_TEST_PORT: Joi.number().port().required(),
          DATABASE_TEST_DATABASE: Joi.string().required(),
          DATABASE_TEST_USERNAME: Joi.string().required(),
          DATABASE_TEST_PASSWORD: Joi.string().required(),
        }).validate(config, { abortEarly: false, allowUnknown: true });

        if (error) {
          throw error;
        }

        return value;
      },
    }),
    DBConnectModule.register({
      type: 'production',
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
