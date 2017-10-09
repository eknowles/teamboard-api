import { Express } from 'express';
import { register, login } from '../endpoints/auth';
import { checkUserPassword } from './middleware/auth';

export function routes(app: Express) {

  app.post('/api/auth/register', checkUserPassword, register);
  app.post('/api/auth/login', checkUserPassword, login);

}
