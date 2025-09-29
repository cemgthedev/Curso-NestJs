import { Module } from '@nestjs/common';
import { ConceptsModule } from 'modules/concepts.module';
import { HelloService } from 'services/hello.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ConceptsModule],
  controllers: [AppController],
  providers: [AppService, HelloService],
})
export class AppModule {}
