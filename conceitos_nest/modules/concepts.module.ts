import { Module } from '@nestjs/common';
import { AutomaticController } from 'controllers/automatic.controller';
import { ManualController } from 'controllers/manual.controller';
import { HelloService } from 'services/hello.service';

@Module({
  controllers: [AutomaticController, ManualController],
  providers: [HelloService],
  exports: [],
})
export class ConceptsModule {}
