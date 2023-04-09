import { Application, json } from 'express';
import morgan from 'morgan';
import jobsRoutes from './jobs';
import authRoutes from './auth';

export const registerRoutes = (app: Application) => {
  app.use('/api', morgan('combined'));
  
  // app.use('/api', json());

  //By this we remove '/api/tasks' from the METHODS URL in route file.
  app.use('/api/v1', [jobsRoutes, authRoutes]);
};
