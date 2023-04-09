import { NextFunction, Request, Response } from 'express';

export const createJob = (req: Request, res: Response, next: NextFunction) => {
  res.send('Success! GET Create Job API.');
};

export const getJobs = (req: Request, res: Response, next: NextFunction) => {
  res.send('Success! GET ALL Jobs API.');
};

export const getJob = (req: Request, res: Response, next: NextFunction) => {
  res.send('Success! GET Job API.');
};

export const updateJob = (req: Request, res: Response, next: NextFunction) => {
  res.send('Success! POST Jobs API.');
};

export const deleteJob = (req: Request, res: Response, next: NextFunction) => {
  res.send('Success! DELETE Jobs API.');
};
