import { StatusCodes } from 'http-status-codes';
import { CustomAPIError } from './customAPIError';

export class UnauthorizedError extends CustomAPIError {
  constructor(message?: string) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED
  }
}
