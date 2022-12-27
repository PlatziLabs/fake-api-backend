/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import {
  QueryFailedError,
  EntityNotFoundError,
  ColumnTypeUndefinedError,
  FindRelationsNotFoundError,
} from 'typeorm';
import { Request, Response } from 'express';

type TypeOrmErrors =
  | QueryFailedError
  | EntityNotFoundError
  | ColumnTypeUndefinedError
  | FindRelationsNotFoundError;

@Catch(
  QueryFailedError,
  EntityNotFoundError,
  ColumnTypeUndefinedError,
  FindRelationsNotFoundError,
)
export class TypeORMExceptionFilter implements ExceptionFilter {
  catch(exception: TypeOrmErrors, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();
    const { url } = request;
    const { name, message } = exception;
    const errorResponse = {
      path: url,
      timestamp: new Date().toISOString(),
      name,
      message,
      code: (exception as any)?.code,
      detail: (exception as any)?.detail,
    };

    response.status(HttpStatus.BAD_REQUEST).json(errorResponse);
  }
}
