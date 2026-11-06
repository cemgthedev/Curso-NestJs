import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthTokenInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const authToken = request.headers.authorization?.split(' ')[1] || null;

    /**
     * Token validation logic can be implemented here. For example, you can check if the token is valid, expired, etc.
     */

    if (!authToken) {
      throw new UnauthorizedException('Authorization token is missing');
    }
    return next.handle();
  }
}
