import { StatusCodes } from 'http-status-codes';

export class CustomError extends Error {
  statusCode: StatusCodes;

  constructor(message: string, statusCode: StatusCodes) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const createCustomError = (message: string, statusCode: StatusCodes) => {
  return new CustomError(message, statusCode);
};
