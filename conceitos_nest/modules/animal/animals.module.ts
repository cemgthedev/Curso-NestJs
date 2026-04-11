import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Animal } from 'entities/animal.entity';
import { AnimalsController } from 'modules/animal/animals.controller';
import { AnimalsService } from 'modules/animal/animals.service';

@Module({
  imports: [TypeOrmModule.forFeature([Animal])],
  controllers: [AnimalsController],
  providers: [AnimalsService],
})
export class AnimalsModule {}
