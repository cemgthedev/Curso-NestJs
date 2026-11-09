import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OnlyLowercaseLettersRegex } from 'common/regex/only-lowercase-letters.regex';
import { RemoveSpacesRegex } from 'common/regex/remove-spaces.regex';
import {
  ONLY_LOWER_CASE_LETTERS,
  REMOVE_SPACES,
} from 'constants/regex.constants';
import { Message } from 'entities/message.entity';
import { UsersModule } from 'modules/users/users.module';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';

// exemplo de dependência circular com UsersModule
@Module({
  imports: [TypeOrmModule.forFeature([Message]), forwardRef(() => UsersModule)],
  controllers: [MessagesController],
  providers: [
    {
      provide: MessagesService,
      useClass: MessagesService,
    },
    {
      provide: REMOVE_SPACES,
      useClass: RemoveSpacesRegex,
    },
    {
      provide: ONLY_LOWER_CASE_LETTERS,
      useClass: OnlyLowercaseLettersRegex,
    },
  ],
  exports: [
    {
      provide: MessagesService,
      useClass: MessagesService,
    },
  ],
})
export class MessagesModule {}
