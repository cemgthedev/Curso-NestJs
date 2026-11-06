import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { tap } from 'rxjs';

@Injectable()
export class TimingConnectionInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    const start = Date.now();
    console.log('Request processing started, simulating a 3-second delay...');

    await new Promise((resolve) => setTimeout(resolve, 3000)); // Simulate a 3-second delay

    return next.handle().pipe(
      tap(() => {
        const end = Date.now();
        const duration = end - start;
        console.log(`Request processing completed in ${duration}ms`);
      }),
    );
  }
}
