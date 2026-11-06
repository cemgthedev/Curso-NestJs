import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { of, tap } from 'rxjs';

export class SimpleCacheInterceptor implements NestInterceptor {
  private readonly cache = new Map<string, any>();

  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    const request = context.switchToHttp().getRequest();
    const cacheKey = `${request.method}:${request.url}`;
    // Here you would implement the actual caching logic
    if (this.cache.has(cacheKey)) {
      console.log(`Cache hit for ${cacheKey}`);
      return of(this.cache.get(cacheKey));
    }
    return next.handle().pipe(tap((value) => this.cache.set(cacheKey, value)));
  }
}
