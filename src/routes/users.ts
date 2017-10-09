import { Express } from 'express';
import { UserController } from '../endpoints/_index';
import { UserAuth } from './middleware/auth';

export function routes(app: Express) {

  app.get('/api/users', UserController.UserGet.list);
  app.post('/api/users', UserAuth, UserController.UserPost.create);
  app.post('/api/users/login', UserAuth, UserController.UserPost.login);

}
