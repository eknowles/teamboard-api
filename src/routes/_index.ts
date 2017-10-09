import * as winston from 'winston';
import { Express, Request, Response } from 'express';
import * as UserRoutes from './users';

export function initRoutes(app: Express) {
  winston.log('info', '--> Initialisation routes');

  app.get('/api', (req: Request, res: Response) => res.status(200).send({ message: 'OK' }));

  UserRoutes.routes(app);

  app.all('*', (req: Request, res: Response) => res.boom.notFound());
}
