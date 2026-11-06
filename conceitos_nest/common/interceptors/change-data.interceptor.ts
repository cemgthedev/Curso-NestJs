import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map } from 'rxjs';

export class ChangeDataInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    return next.handle().pipe(
      map((data) => {
        if (data && typeof data === 'object') {
          return { ...data, type: 'object' }; // Example transformation
        } else if (Array.isArray(data)) {
          return data.map((item) => ({ ...item, type: 'array' })); // Example transformation for array items
        }
        // Implement data transformation logic here
        return data;
      }),
    );
  }
}
