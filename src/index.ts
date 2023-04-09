import * as dotenv from 'dotenv';
import express from 'express';
import { notFound404Middleware, errorHandlerMiddleware } from '@src/middlewares';
import { registerRoutes } from '@src/routes';
import { connectDB } from '@src/db';
import bodyParser from 'body-parser';

try {
  // dotenv.config();

  const app = express();

  // parse application/x-www-form-urlencoded
  // app.use(bodyParser.urlencoded({ extended: false }));

  // parse application/json
  app.use(bodyParser.json());

  registerRoutes(app);

  //This renders custom message for 404 APIs
  app.use(notFound404Middleware);

  //This error handler is used to log or send the error from one place
  app.use(errorHandlerMiddleware);

  (async () => {
    try {
      //DB Connection
      if (!process.env.MONGO_DB_URI) throw new Error('Mongo DB URI is missing!');

      await connectDB(process.env.MONGO_DB_URI.replace(/\\/g, '')); // replace method is use to remove \ which comes while using in VS Code.

      //Server
      app.listen(6000, () => {
        console.log('Server has started on port 6000...');
      });
    } catch (error) {
      console.log(error);
    }
  })();
} catch (error) {
  console.log(error);
}
