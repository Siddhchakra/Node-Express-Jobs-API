import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { sign } from 'jsonwebtoken';
import { UserModel } from '@src/models';
import { BadRequestError, UnauthorizedError } from '@src/errors';

export const registerUser = async ({ body }: Request, res: Response, next: NextFunction) => {
  const user = await UserModel.create({ ...body });

  const token = user.createJWT();

  res.status(StatusCodes.CREATED).send({ token });
};

export const signInUser = async ({ body }: Request, res: Response, next: NextFunction) => {
  const { email, password } = body;

  if (!email || !password) throw new BadRequestError('Please provide email and password');

  const user = await UserModel.findOne({ email });

  if (!user) throw new UnauthorizedError('User not found');

  const token = user.createJWT();

  res.status(StatusCodes.OK).send({ token });
};
