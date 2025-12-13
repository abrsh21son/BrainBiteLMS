import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  success: boolean;
  data: T;
  timestamp?: string;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const request = context.switchToHttp().getRequest();
    const { url } = request;

    // Skip transformation for Swagger/docs endpoints
    if (url?.includes('/api/docs') || url?.includes('/api-json')) {
      return next.handle();
    }

    return next.handle().pipe(
      map((data) => {
        // If data is already in the correct format, return as-is
        if (data && typeof data === 'object' && 'success' in data) {
          return data as Response<T>;
        }
        
        // Otherwise wrap it
        return {
          success: true,
          data,
          timestamp: new Date().toISOString(),
        };
      }),
    );
  }
}

