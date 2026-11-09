import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegexFactory } from 'common/regex/regex.factory';
import {
  ONLY_LOWER_CASE_LETTERS,
  REMOVE_SPACES,
} from 'constants/regex.constants';
import { Animal } from 'entities/animal.entity';
import { AnimalsController } from 'modules/animal/animals.controller';
import { AnimalsService } from 'modules/animal/animals.service';

@Module({
  imports: [TypeOrmModule.forFeature([Animal])],
  controllers: [AnimalsController],
  providers: [
    {
      provide: AnimalsService,
      useClass: AnimalsService,
    },
    RegexFactory,
    {
      provide: REMOVE_SPACES,
      useFactory: (regexFactory: RegexFactory) => {
        // pode ter lógica antes (ex.: selecionando classes)
        return regexFactory.create('RemoveSpacesRegex');
      },
      inject: [RegexFactory], // injeta na factory em ordem
    },
    {
      provide: ONLY_LOWER_CASE_LETTERS,
      useFactory: (regexFactory: RegexFactory) => {
        return regexFactory.create('OnlyLowercaseLettersRegex');
      },
      inject: [RegexFactory], // injeta na arrow function de useFactory em ordem
    },
  ],
})
export class AnimalsModule {}
