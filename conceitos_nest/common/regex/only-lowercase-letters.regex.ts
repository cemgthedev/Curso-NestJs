import { RegexProtocol } from 'common/regex/regex-protocol.regex';

export class OnlyLowercaseLettersRegex implements RegexProtocol {
  execute(str: string): string {
    return str.replace(/[^a-z]/g, '');
  }
}
