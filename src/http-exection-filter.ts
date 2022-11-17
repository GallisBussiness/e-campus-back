import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

const logger = new Logger('HttpException')

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

  logger.log({
        statusCode: status,
        message: exception.getResponse(),
        timestamp: new Date().toISOString(),
        path: request.url,
      });

    throw new HttpException(exception.message, exception.getStatus());
  }
}