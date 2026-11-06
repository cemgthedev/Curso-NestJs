import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ConflictException,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

// Códigos de erro do PostgreSQL
const PG_ERRORS = {
  NOT_NULL_VIOLATION: '23502',
  FOREIGN_KEY_VIOLATION: '23503',
  UNIQUE_VIOLATION: '23505',
  CHECK_VIOLATION: '23514',
  NUMERIC_OUT_OF_RANGE: '22003',
  STRING_TOO_LONG: '22001',
} as const;

export function catchError(error: any) {
  if (error instanceof HttpException) return error;

  if (error instanceof QueryFailedError) {
    const { code } = error.driverError as { code?: string };

    switch (code) {
      case PG_ERRORS.UNIQUE_VIOLATION:
        throw new ConflictException('Product already exists');

      case PG_ERRORS.FOREIGN_KEY_VIOLATION:
        throw new ConflictException(
          'Operation violates a relation with another resource',
        );

      case PG_ERRORS.NOT_NULL_VIOLATION:
        throw new BadRequestException('A required field is missing');

      case PG_ERRORS.CHECK_VIOLATION:
        throw new BadRequestException('A value violates a data constraint');

      case PG_ERRORS.STRING_TOO_LONG:
        throw new BadRequestException('A text value is too long');

      case PG_ERRORS.NUMERIC_OUT_OF_RANGE:
        throw new BadRequestException('A numeric value is out of range');
    }
  }

  throw Error('Unknown error');
}

@Catch()
export class MyExceptionFilter<T extends any> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    console.log(`Context ${ctx}`);
    catchError(exception);
  }
}
