import { StatusCodes } from 'http-status-codes';

export class CustomAPIError extends Error {
  statusCode!: StatusCodes; //Exclamation declares variable with defined assertion. During assignment null | undefined is not accepted.

  constructor(message?: string) {
    super(message);
  }
}
