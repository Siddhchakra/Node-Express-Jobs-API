import { CustomAPIError } from '@src/errors';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const errorHandlerMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.log('errorHandlerMiddleware: ', err);

  const errorResspone = { sucess: false, message: 'Something went wrong. Please try againg later.' };

  if (err instanceof CustomAPIError) {
    errorResspone.message = err.message;

    res.status(err.statusCode).send(errorResspone);
  }

  res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorResspone);
};
