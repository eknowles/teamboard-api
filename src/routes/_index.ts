import * as winston from 'winston';
import { Express, Request, Response } from 'express';
import * as LanguagesRoutes from './languages';
import * as AppUserRoutes from './appusers';

export function initRoutes(app: Express) {
  winston.log('info', '--> Initialisation routes');

  app.get('/api', (req: Request, res: Response) => res.status(200).send({message: 'OK'}));

  LanguagesRoutes.routes(app);
  AppUserRoutes.routes(app);

  app.all('*', (req: Request, res: Response) => res.boom.notFound());
}
