import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { catchError, throwError } from 'rxjs';

export class ErrorHandlingInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    return next.handle().pipe(
      catchError((error) => {
        return throwError(() => {
          const statusCode = error.status || 500;
          const message = error.message || 'Internal Server Error';
          return {
            statusCode,
            message,
          };
        });
      }),
    );
  }
}
