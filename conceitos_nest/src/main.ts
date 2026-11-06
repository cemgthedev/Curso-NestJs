import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MyExceptionFilter } from 'common/filters/my-exception.filter';
import { ErrorHandlingInterceptor } from 'common/interceptors/error-hanling.interceptor';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove chaves que não existem no DTO
      forbidNonWhitelisted: true, // retorna erro se tiverem chaves que não existem no DTO
      transform: true,
    }),
  );
  app.useGlobalInterceptors(new ErrorHandlingInterceptor());
  app.useGlobalFilters(new MyExceptionFilter());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
