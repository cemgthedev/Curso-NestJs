import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseIntIdPipe implements PipeTransform {
  transform(value: unknown, metadata: ArgumentMetadata): number {
    if (metadata.type !== 'param' || metadata.data !== 'id') {
      return value as number;
    }

    const parsedValue = Number(value);

    if (!Number.isInteger(parsedValue)) {
      throw new BadRequestException(
        `Validation failed. "${value}" is not an integer.`,
      );
    }

    if (parsedValue <= 0) {
      throw new BadRequestException(
        `Validation failed. "${value}" must be a positive number.`,
      );
    }

    return parsedValue;
  }
}
