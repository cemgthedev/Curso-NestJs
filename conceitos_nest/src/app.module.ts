import { Module } from '@nestjs/common';
import { MachinesModule } from 'modules/machines/machines.module';
import { UsersModule } from 'modules/users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [UsersModule, MachinesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
