import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { OnlyLowercaseLettersRegex } from 'common/regex/only-lowercase-letters.regex';
import { RegexProtocol } from 'common/regex/regex-protocol.regex';
import { RemoveSpacesRegex } from 'common/regex/remove-spaces.regex';

export type ClassNameRegex = 'OnlyLowercaseLettersRegex' | 'RemoveSpacesRegex';

@Injectable()
export class RegexFactory {
  create(className: ClassNameRegex): RegexProtocol {
    switch (className) {
      case 'OnlyLowercaseLettersRegex':
        return new OnlyLowercaseLettersRegex();
      case 'RemoveSpacesRegex':
        return new RemoveSpacesRegex();
      default:
        throw new InternalServerErrorException(
          `No class found for ${className}`,
        );
    }
  }
}
