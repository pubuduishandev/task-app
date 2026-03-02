import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  status: string; // Dynamic: "success" or "error"
  code: number;   // Dynamic: 200, 201, 400, etc.
  message: string;
  data: T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    // 1. Get the underlying response object from the context
    const response = context.switchToHttp().getResponse();
    const statusCode = response.statusCode;

    return next.handle().pipe(
      map((data) => {
        // 2. Determine status string based on the actual HTTP code
        // Any code between 200-299 is considered a "success"
        const isSuccess = statusCode >= 200 && statusCode < 300;
        
        return {
          status: isSuccess ? 'success' : 'error',
          code: statusCode, // Optional: keeps the numeric code for frontend debugging
          message: data.message || 'Request processed',
          // 3. Handle data nesting: Use data.data if it exists, else the whole object
          data: data.data !== undefined ? data.data : data,
        };
      }),
    );
  }
}