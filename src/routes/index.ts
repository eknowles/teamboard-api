import * as winston from 'winston';
import { Express, Request, Response } from 'express';

import { query } from 'express-validator/check';
import { checkUserPassword, isUser, validate } from './middleware';
import * as LocaleController from './api/locales/locales.controller';
import * as AuthController from './api/auth/auth.controller';
import * as UserController from './api/users/users.controller';

export function initRoutes(app: Express) {
  winston.log('info', '--> Initialisation routes');

  app.get('/api', (req: Request, res: Response) => res.status(200).send({ message: 'OK' }));
  app.get('/api/locales', LocaleController.getLocales);

  // Auth
  app.post('/api/auth/login', checkUserPassword, validate, AuthController.login);
  app.post('/api/auth/register', checkUserPassword, validate, AuthController.register);

  // Users
  app.get('/api/users', UserController.getAllUsers);
  app.get('/api/users/me', isUser, validate, UserController.getMe);
  app.get('/api/users/:userId', UserController.getUserById);

  app.get('/api/check-email', query('q').exists().isEmail(), validate, UserController.userExistsWithEmail);

  app.all('*', (req: Request, res: Response) => res.boom.notFound());
}
