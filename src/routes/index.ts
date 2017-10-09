import * as winston from 'winston';
import { Express, Request, Response } from 'express';
import { checkUserPassword } from './middleware';
import { getLocales } from './api/locales/locales.controller';
import * as AuthController from './api/auth/auth.controller';
import * as UserController from './api/users/users.controller';

export function initRoutes(app: Express) {
  winston.log('info', '--> Initialisation routes');

  app.get('/api', (req: Request, res: Response) => res.status(200).send({ message: 'OK' }));
  app.get('/api/locales', getLocales);

  // Auth
  app.post('/api/auth/login', checkUserPassword, AuthController.login);
  app.post('/api/auth/register', checkUserPassword, AuthController.register);

  // Users
  app.get('/api/users', UserController.getAllUsers);
  app.get('/api/users/:userId', UserController.getUserById);

  app.all('*', (req: Request, res: Response) => res.boom.notFound());
}
