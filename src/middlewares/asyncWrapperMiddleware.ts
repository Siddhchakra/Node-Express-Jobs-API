import { NextFunction, Request, Response } from 'express';

export const asyncWrapperMiddleware = (fn: (req: Request, res: Response, next: NextFunction) => void) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      fn(req, res, next);
    } catch (error) {
      //This will call the next middleware i.e. 'errorHandler'.
      next(error);
    }
  };
};
