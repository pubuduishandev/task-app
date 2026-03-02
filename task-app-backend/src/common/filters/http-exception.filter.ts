import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    
    // Determine the status code
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // Get the error message
    const exceptionResponse: any = 
      exception instanceof HttpException 
        ? exception.getResponse() 
        : { message: 'Internal server error' };

    const message = typeof exceptionResponse === 'object' 
      ? exceptionResponse.message 
      : exceptionResponse;

    // FORMAT THE RESPONSE TO MATCH SUCCESS
    response.status(status).json({
      status: 'error',       // Instead of 'success'
      code: status,          // Matches your 'code' field
      message: Array.isArray(message) ? message[0] : message, // Handles validation arrays
      data: null,            // Keep the envelope consistent
    });
  }
}