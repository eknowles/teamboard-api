import { Express } from 'express';
import { UserController } from '../endpoints/_index';

export function routes(app: Express) {

  app.get('/api/users', UserController.UserGet.list);
  app.get('/api/users/:userId', UserController.UserGet.getUserById);

}
