import { Express } from 'express';
import { UserController } from '../endpoints/_index';
import { checkUserPassword } from './middleware/auth';

export function routes(app: Express) {

  app.get('/api/users', UserController.UserGet.list);
  app.get('/api/users/:userId', UserController.UserGet.getUserById);

  app.post('/api/users', checkUserPassword, UserController.UserPost.create);
  app.post('/api/users/login', checkUserPassword, UserController.UserPost.login);

}
